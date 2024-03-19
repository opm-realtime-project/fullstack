const {verifyToken} = require('../helpers/jwt');
const {User} = require('../models');

async function authentication(req, res, next){
    try {
        let token = req.headers.authorization
        
        if(!token){
            throw {name: 'Invalid Token'}
        }
        if(token.split(" ")[0] !== 'Bearer'){
            throw {name: 'Invalid Token'}
        }
        token = token.split(" ")[1]
        let payload = verifyToken(token)
        if(!payload){
            throw {name: 'Invalid Token'}
        }
        let user = await User.findByPk(payload.id)
        if(!user){
            throw {name: 'Invalid Token'}
        }
        req.user = {
            id: user.id,
            role: user.role
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = authentication