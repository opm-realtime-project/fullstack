// npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string
if (process.env.NODE_ENV !== "production"){
    require("dotenv").config()
  }

const express = require('express');
const authentication = require("./middlewares/authentication");
const UserController = require("./controllers/UserController");
const app = express();
const { Server } = require("socket.io");
const { createServer } = require("http");
const cors = require('cors');
const { errHandler } = require("./middlewares/ErrorHandler");
const PORT = 3000;
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

let users = [];
let messages = [];

io.on("connection", (socket) => {
  console.log(socket.id, "<<< user connected");

  console.log(socket.handshake.auth, "<<< handshake");

  if (socket.handshake.auth.username) {
    users.push(socket.handshake.auth.username);
  }

  socket.emit("message", "Welcome to the socket server ", + socket.id);
  socket.emit("message:info", messages);

  io.emit("users", users);

  socket.on("message:new", (param) => {
    messages.push(param);
    io.emit("message:info", param);
  })

  socket.on('canvas-data', (data) => {
    socket.broadcast.emit('canvas-data', data)
})

  socket.on("disconnect", () => {
    users = users.filter((user) => {
      return user !== socket.handshake.auth.username
    })
    io.emit('users', users);
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', UserController.register)
app.post('/login',  UserController.login )

app.use(errHandler)

httpServer.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

module.exports = app