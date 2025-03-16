const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');  

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    // Fix: lowercase 'socket'
    socket.on('user-message', (message) => {
       io.emit('message',message);
    });

   
});

// Serve static files correctly
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Fix: Place listen() at the end
server.listen(3000, () => console.log('Server is running on port 3000'));
