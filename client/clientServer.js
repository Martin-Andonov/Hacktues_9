let http = require('http');
let ws = require('ws');
const { open } = require('node:fs/promises');
// import { createServer } from 'http';
// import { WebSocketServer } from 'ws';

function onSocketError(err) {
  console.error(err);
}

const server = http.createServer();
const wss = new ws.WebSocketServer({ noServer: true });

wss.on('connection', function connection(ws, request, client) {
  ws.on('error', console.error);
    console.log("Connection established");
  ws.on('message', function message(data) {
    console.log(`Received message ${data} from user ${client}`);
  });
});

server.on('upgrade', function upgrade(request, socket, head) {
  socket.on('error', onSocketError);

  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });

});

server.on('request' , async function request(request, response) {
    console.log(request.url);
    response.writeHead(200);

    const file = await open(`.${request.url}`);

    for await (const line of file.readLines()) {
      response.write(line);
    }

    response.end();

});

server.listen(5555);