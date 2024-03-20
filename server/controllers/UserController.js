const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const {User} = require('../models');

module.exports = class UserController {
    static async register(req, res, next){
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
        } catch (err) {
            console.log(err);
            next()
        }
    }

    static async login(req, res, next){
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

            if(!user){
                throw {name: "Unauthorized", message: "email wrong", status: 401}
            }

            const isValidPassword = comparePassword(password, user.password)
            if(!isValidPassword){
                throw {name: "Unauthorized", message: "password wrong", status: 401}
            }

            const accessToken = signToken({id: user.id, email: user.email})

            res.status(200).json({"user": {
                id: user.id,
                username: user.username,
                email: user.email
            }, accessToken})

        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}