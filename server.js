const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set the global countdown target (start time)
let countdownTarget = Date.now() + 86400000; // 1 day from now (86400000 ms = 1 day)

app.use(express.static('public'));

io.on('connection', (socket) => {
  // Assign a random username
  const username = `User${Math.floor(Math.random() * 10000) + 1}`;
  console.log(`User connected: ${username}`);

  // Send the current countdown value to the user
  socket.emit('timer', countdownTarget);

  // Send the current chat messages to the user
  socket.emit('chatMessages', chatMessages);

  // Listen for new chat messages
  socket.on('chatMessage', (message) => {
    chatMessages.push({ username, message });
    io.emit('chatMessages', chatMessages); // Broadcast the new message to all users
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${username}`);
  });
});

// Broadcast the timer to all users every second
setInterval(() => {
  const remainingTime = countdownTarget - Date.now();
  if (remainingTime <= 0) {
    countdownTarget = Date.now() + 86400000; // Reset to another day if the time is over
  }
  io.emit('timer', countdownTarget);
}, 1000);

const chatMessages = [];

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});