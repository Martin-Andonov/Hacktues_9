const WebSocket = require('ws');
const ws = new WebSocket('ws://10.1.79.139:9999');

ws.onopen = function() {
  console.log('Connected to server');
  ws.send('Hello, server!');
};

ws.onmessage = function(event) {
  console.log('Received: ' + event.data);
};

ws.onclose = function() {
  console.log('Disconnected from server');
};