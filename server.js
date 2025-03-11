const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Timer Setup: Global Timer (24 hours)
let timerStart = Date.now(); // Time when the server started
let timerEnd = timerStart + 86400000; // 24 hours from server start

// Serve the frontend
app.use(express.static('public')); // Serve your HTML, JS, CSS

// API endpoint to fetch remaining time
app.get('/timer', (req, res) => {
  const remainingTime = timerEnd - Date.now();
  res.json({ remainingTime });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});