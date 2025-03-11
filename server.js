const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the frontend
app.use(express.static('public')); // Serve your HTML, JS, CSS

// API endpoint to fetch the fixed date and time
app.get('/datetime', (req, res) => {
  const fixedDateTime = 'MARCH 12 2025 6:30 GMT';
  res.json({ datetime: fixedDateTime });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});