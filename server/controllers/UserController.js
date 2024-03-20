const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const {User} = require('../models');

module.exports = class UserController {
    static async register(req, res, next){
        try {
            let {username, email, password} = req.body

            if(!password || !email){
                throw ({name: "Email/Password Required"})
            }

            let data = await User.create ({
                username: username, 
                email: email, 
                password: password, 
            })

            res.status(201).json({username: data.username, email: data.email})
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async login(req, res, next){
        try {
            const {email, password} = req.body
            // console.log(email, "EMAIL", password, "PASSWORD");
            if (!email || !password){
                throw {name: "InvalidLogin"}
            }

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if(!user){
                throw {name: "NoUserFound"}
            }

            const isValidPassword = comparePassword(password, user.password)
            if(!isValidPassword){
                throw {name: "InvalidLogin"}
            }

            const accessToken = signToken({id: user.id, email: user.email})

            res.status(200).json({"user": {
                username: user.username,
                email: user.email
            }, accessToken})

        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}