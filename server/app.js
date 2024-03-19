// npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string
if (process.env.NODE_ENV !== "production"){
    require("dotenv").config()
  }

const express = require('express')
const authentication = require("./middlewares/authentication")
const UserController = require("./controllers/UserController")
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', UserController.register)
app.post('/login',  UserController.login )

module.exports = app