const bcrypt = require('bcryptjs');

function hashPassword(plainPass){
    return bcrypt.hashSync(plainPass,bcrypt.genSaltSync(10))
}

function comparePassword(plainPass, hashedPass){
    return bcrypt.compareSync(plainPass,hashedPass)
}

module.exports = {hashPassword, comparePassword}