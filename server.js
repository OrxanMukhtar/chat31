const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        const broadcastMessage = JSON.stringify({ nickname: data.nickname, text: data.text });
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(broadcastMessage);
            }
        });
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
