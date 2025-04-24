import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(express.json()); // Middleware to parse JSON requests

const hostname = 'localhost';
const port = 5000;

// Socket.IO connection event
io.on('connection', (socket) => {




  console.log('A user connected');

  // When a user joins a socket room (using their userId)
  socket.on('join', (userId) => {
    console.log(`User ${userId} joined`);
    socket.join(userId); // Join the socket room based on userId
  });








  // When a user leaves the socket room
  socket.on('leave', (userId) => {
    console.log(`User ${userId} left`);
    socket.leave(userId); // Leave the socket room based on userId
  });



  // Listen for incoming messages from the client
  socket.on('chatMessage', (message) => {
    console.log('Message from client:', message);
    const { recipientId, content, senderId,fileUrl,fileType,fileName ,timestamp} = message;

    // Emit to the recipient's socket room
    io.to(recipientId).emit('chatMessage', {
      senderId,
      recipientId,
      content,
      fileUrl,
fileType,
fileName ,
      timestamp
    });

    // Optionally, you can also emit to the sender's room (for confirmation)
    io.to(senderId).emit('chatMessage', {
      senderId,
      recipientId,
      content,
      fileUrl,
fileType,
fileName ,
      timestamp
    });

    io.to(recipientId).emit('notification', {
      senderId,
      content,
      fileUrl,
fileType,
fileName , 
      timestamp,
    });



  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });




});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
