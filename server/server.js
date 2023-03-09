const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9999 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);
    ws.send('Server says: ' + message);
  });

  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

ws.send("server");