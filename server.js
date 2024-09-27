// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();


const corsOptions = {
    origin: 'http://localhost:4200', // Allow only your Angular app's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };

app.use(cors(corsOptions));

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200',  // Angular app URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
});


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message); // Broadcast the message to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
