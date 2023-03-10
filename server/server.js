const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9999 });
let conection = new Object()
let connections = [];
let check_arrray = [];
 

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

function initiate_check(ip)
{
  //console.log(connections);


  for(let i = 0; i < connections.length; i++)
  {
    if(connections[i].addres = ip)
    {
       //TODO: ne bachka opravi go 
       check_arrray.push(connections[i]);
       connections.splice(i, 1); //tova moje i da bachka 
       break;
    }
  }

  //console.log(connections);
}

function update_time(ip)
{
  //update time when new message arrives
  for(let i = 0; i < connections.length; i++)
  {
    if(connections[i].addres = ip)
    {
      connections[i].time = Date.now();
    }
  }
}

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  if(chek_for_existance(ws._socket.remoteAddress))
  {
    

  }else
  {
    conection.addres = ws._socket.remoteAddress;
    conection.time = Date.now()
    connection.message = "";
  
    connections.push(conection);

  ws.on('message', function incoming(message) {

    //connection.message = message; chek if it works
    update_time(connection.addres);
     
    console.log(`Address: ${connections[0].addres} Date: ${connections[0].time}`);
    console.log('Received: %s', message);
    ws.send('Server says: ' + message);
  });

  ws.on('close', function close() {

    console.log('Client disconnected');
    initiate_check(ws._socket.remoteAddress);
  });

  }
});


function check_for_time()
{
  
  
  for(let i = 0; i< check_arrray.length; i++)
  {

    if(Date.now() - check_arrray[i].time > 10)//if you are disconected for more than 5minutes (300 sec) enters
    {
      console.log("kur valq e zatrupan");
    }   
  }
  
}
setInterval(check_for_time, 1000);
