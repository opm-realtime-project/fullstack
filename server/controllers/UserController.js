const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const {User} = require('../models');

module.exports = class UserController {
    static async register(req, res){
        try {
            let {username, email, password} = req.body

            if(!password){
                throw ({message: "Email/Password can't be empty"})
            }

            let data = await User.create ({
                username: username, 
                email: email, 
                password: password, 
            })

            res.status(201).json(data)
        } catch (error) {
            console.log(error);
        }
    }

    static async login(req, res){
        try {
            const {email, password} = req.body
            // console.log(email, "EMAIL", password, "PASSWORD");
            if (!email || !password){
                throw {name: "Bad Request", message: "email and password is required", status: 400}
            }

            const user = await User.findOne({
                where: {
                    email
                }
            })
            console.log(user, '>>>>>> ini user');

            if(!user){
                throw {name: "Unauthorized", message: "email wrong", status: 401}
            }

            const isValidPassword = comparePassword(password, user.password)
            if(!isValidPassword){
                throw {name: "Unauthorized", message: "password wrong", status: 401}
            }

            const accessToken = signToken({id: user.id, email: user.email})

            res.status(200).json({message: 'login success', accessToken})

        } catch (error) {
            console.log(error);
        }
    }
}