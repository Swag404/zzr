const { createServer } = require('http');
const express = require('express');
const path = require('path');

const app = express();

// Serve the index.html for all paths
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Handle /coslink route
app.get('/coslink', (req, res) => {
    res.send(`
      <html>
        <head>
          <title>Special Page</title>
        </head>
        <body>
          <div style="text-align: center;">
            <h1>Congratulations! You found me!</h1>
          </div>
        </body>
      </html>
    `);
});

// Handle /rules route
app.get('/rules', (req, res) => {
    res.send(`
      <html>
        <head>
          <title>Rules</title>
        </head>
        <body>
          <div style="text-align: center;">
            <h1>Hello, welcome to the second page!</h1>
            <p>But I want you to find another link. It starts with seven letters... Give it a try!</p>
          </div>
        </body>
      </html>
    `);
});

// Listen for requests
createServer(app).listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});