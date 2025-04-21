import WebSocket from 'ws';

const socket = new WebSocket('wss://q6mw1oj3z7.execute-api.eu-north-1.amazonaws.com/production');
// const socket = new WebSocket('wss://scfcws7abh.execute-api.eu-north-1.amazonaws.com/production/');

socket.on('open', () => {
    console.log('Connected to WebSocket');
    // Send a message
    socket.send(JSON.stringify({
        action: 'yourActionName',
        data: 'yourData'
    }));
});

socket.on('message', (data) => {
    console.log('Message from server:', data.toString());
});

socket.on('close', () => {
    console.log('WebSocket connection closed');
});

socket.on('error', (error) => {
    console.error('WebSocket error:', error);
});
