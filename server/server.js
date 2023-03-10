const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9999 });
let conection = new Object()
let connections = [];


function chek_for_existance(ip)
{
  for(let i = 0; i < connections.length; i++ )
  {
    if(connections[i].addres = ip)
    {
      return 1;
    }
  }

  return 0;

}

function remove_client(ip)
{
  console.log(connections);

  for(let i = 0; i < connections.length; i++)
  {
    if(connections[i].addres = ip)
    {
       //TODO: ne bachka opravi go 
       connections.splice(i, 1); //tova moje i da bachka 
    }
  }

  console.log(connections);
}


wss.on('connection', function connection(ws) {
  console.log('Client connected');



  if(chek_for_existance(ws._socket.remoteAddress))
  {
    

  }else
  {
    conection.addres = ws._socket.remoteAddress;
    conection.time = Date.now()
  
    connections.push(conection);
  ws.on('message', function incoming(message) {

    console.log(`Address: ${connections[0].addres} Date: ${connections[0].time}`);
    console.log('Received: %s', message);
    ws.send('Server says: ' + message);
  });

  ws.on('close', function close() {

    console.log('Client disconnected');
    remove_client(ws._socket.remoteAddress);
  });

  }
});


function check_for_time()
{
  for(let i = 0; i< 1000; i++)
  {
    //console.log("i love men!");
  }
  
}
check_for_time();
