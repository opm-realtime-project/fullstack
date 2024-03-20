// npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string
if (process.env.NODE_ENV !== "production"){
    require("dotenv").config()
  }
const express = require('express');
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

let users = {};
let messages = [];

io.on("connection", (socket) => {
  console.log(socket.id, "<<< user connected");

  console.log(socket.handshake.auth, "<<< handshake");

  const { username } = socket.handshake.auth;
  if (username) {
    users[username] = socket.id; // Store the socket ID associated with the username
  }

  socket.emit("message", "Welcome to the socket server ", + socket.id);
  socket.emit("message:info", messages);

  io.emit("users", Object.keys(users)); // Send the list of online users

  socket.on("message:new", (param) => {
    messages.push(param);
    io.emit("message:info", param);
  });

  socket.on("private:message", (param) => {
    const { from, to, message } = param;
    const recipientSocketId = users[to];
    const senderSocketId = users[from];
    if (recipientSocketId && senderSocketId) {
        const privateMessage = { from, to, message };
        io.to(recipientSocketId).emit("private:message", privateMessage);
        io.to(senderSocketId).emit("private:message", privateMessage);
    } else {
        console.log("Recipient or sender socket not found for user.");
    }
  });

  socket.on('canvas-data', (data) => {
    socket.broadcast.emit('canvas-data', data)
  });

  socket.on("disconnect", () => {
    for (const [key, value] of Object.entries(users)) {
      if (value === socket.id) {
        delete users[key]; // Remove the disconnected user from the users map
        break;
      }
    }
    io.emit('users', Object.keys(users));
  });
});

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