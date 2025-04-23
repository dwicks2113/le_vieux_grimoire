const http = require('http');
const app = require('./app'); // Import the app from app.js

app.set('port', process.env.PORT || 3000);
// Middleware to parse JSON request bodies

const server = http.createServer((req, res) => {
    res.end('This is the backend server response!');
});

server.listen(process.env.PORT || 3000);