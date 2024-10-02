// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const users = []; // This will be replaced by a database like MongoDB
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';
let chatRooms = {};

const corsOptions = {
    origin: 'http://localhost:4200', // Allow only your Angular app's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };

const socketOptions = {
  cors: {
    origin: 'http://localhost:4200',  // Angular app URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
};
app.use(express.json());
app.use(cors(corsOptions));

const server = http.createServer(app);

const io = socketIo(server, socketOptions);


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (room) => {

    socket.join(room);
    console.log(`User joined room ${room}`);

    if (!chatRooms[room]) {
      // chatRooms[room] = [];
      return socket.emit('error', 'Room does not exist');
    }

    socket.emit('previousMessage', chatRooms[room]);
  });

  socket.on('sendMessage', (data) => {
    const { room, user, message } = data;

    // Add the new message to the room's message array
    const newMessage = { user, message, timestamp: new Date() };
    chatRooms[room].push(newMessage);

    // Broadcast the message to all users in the room
    io.to(room).emit('receiveMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

});

app.post('/createRoom', (req, res) => {
  const { roomName } = req.body;

  if (chatRooms[roomName]) {
    return res.status(400).json({ message: 'Room already exists' });
  }

  chatRooms[roomName] = [];
  res.status(201).json({ message: 'Room created successfully', roomName });
});

// API to get list of all rooms
app.get('/rooms', (req, res) => {
  res.json({ chatRooms });
});

app.get('/users', (req, res) => {
  res.json({ users });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Store the user
  const user = { username, password: hashedPassword };
  users.push(user);

  res.status(201).json({ message: 'User created successfully' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Check if the user exists
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Generate a JWT token
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({ token });
});

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Protect a route
app.get('/protected-route', authMiddleware, (req, res) => {
  res.status(200).json({ message: `Hello, ${req.user.username}` });
});


server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
