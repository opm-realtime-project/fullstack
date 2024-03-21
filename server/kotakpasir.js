require("dotenv").config()
const { signToken } = require("./helpers/jwt");

const token = signToken('isi data')
console.log(token);