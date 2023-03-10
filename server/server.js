const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 9999 });
const htp_resp = new WebSocket.Server({port: 9998}); 

let conection = new Object()
let connections = [];
let check_arrray = [];
const mysql = require('mysql');

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      //host: '10.1.79.77',
      host: '192.168.0.110',
      user: 'vScopeUserName',
      password: 'password',
      database: 'resqme',
    });
  }

  connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error('Error connecting to database:', err);
        return;
      }
      console.log('Connected to database!');
    });
    
    var sql = 'USE resqme;';

    this.connection.query(sql, function (err) {
        if (err) throw err;
        console.log("Database selected");
    });
  }

  addClient(lang, lat, date, message){
    var sql = `INSERT INTO \`resqme\`(\`latitude\`, \`longitute\`, \`id\`, \`date\`, \`message\`) VALUES ('${lang}','${lat}', NULL, '${date}', '${message}')`;
    console.log("SQL", sql);
    
    this.connection.query(sql, function (err) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  }

  delete(id) {
    const query = `DELETE FROM resqme WHERE id = ${id}`;

    this.connection.query(query, (err, result) => {
      if (err) throw err;

      console.log(`Deleted ${result.affectedRows} row(s)`);
    });
  }

  getInfo(id){
    const query = `SELECT latitude, longitute, date FROM resqme WHERE id = ${id}`;

    this.connection.query(query, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  }

  async getAllCoords(){

    
    let calbackresolve;
    let calbackreject;
    let cordscalback = (resolve, reject) => {
              calbackresolve = resolve;
              calbackreject = reject;
    }
    let cordspromise = new Promise(cordscalback);
    const query = `SELECT latitude, longitute, message FROM resqme`;

    this.connection.query(query, (err, result) => {
      
      if (err) calbackreject (err);

      calbackresolve (result);
    });
    return cordspromise;
  }
}
//////////////////////////////driver code///////////////////////////////////
const db = new Database();
db.connect();

function chek_for_existance(ip)
{
  for(let i = 0; i < connections.length; i++ )
  {
    if(connections[i].addres == ip)
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
    if(connections[i].addres == ip)
    {
       check_arrray.push(connections[i]);
       //connections.splice(i, 1); //tova moje i da bachka 
       break;
    }
  }

  //console.log(connections);
}

function delete_from_array(ip)
{
  for(let i = 0; i < connections.length; i++)
  {
    if(connections[i].addres == ip)
    {
       connections.splice(i, 1); //tova moje i da bachka 
       break;
    }
  }
}
function remove_from_check(ip)
{
  for(let i = 0; i < check_arrray.length; i++)
  {
    if(check_arrray[i].addres == ip)
    {
       check_arrray.splice(i, 1); //tova moje i da bachka 
       break;
    }
  }
}

function update_time(ip)
{
  //update time when new message arrives
  for(let i = 0; i < connections.length; i++)
  {
    if(connections[i].addres == ip)
    {
      connections[i].time = Date.now();
    }
  }
}

function update_message(ip, message)
{
  for(let i = 0; i < connections.length; i++)
  {
    if(connections[i].addres == ip)
    {
      
      connections[i].message = message;
    }
  }
}

htp_resp.on('connection',async function connection(ws)
{
  db_answer = await db.getAllCoords();
  let cords_obj = {};
  let output_arr = [];
  
  for(let i = 0; i < db_answer.length; i++)
  {
    cords_obj.lat = db_answer[i].latitude;
    cords_obj.long = db_answer[i].longitute;
    cords_obj.message = db_answer[i].message;
    output_arr.push([cords_obj.lat,cords_obj.long,cords_obj.message]);
  }

  //console.log(output_arr);
  ws.send(JSON.stringify(output_arr));

});

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  if(chek_for_existance(ws._socket.remoteAddress))
  {
    console.log("\nClient reconnected!");
    remove_from_check(ws._socket.remoteAddress);

  }else
  {
    conection.addres = ws._socket.remoteAddress;
    conection.time = Date.now()
    conection.message = "";
  
    connections.push(conection);
  }
  ws.on('message', function incoming(message) {
     
    console.log(`Address: ${connections[0].addres} Date: ${connections[0].time}`);
    console.log('Received: %s', message);
    ws.send('Server says: ' + message);

    if(message[0] == 49)
    { 
      //const mesage_aray = message.split("|");
      //db.addClient(parseFloat(mesage_aray[1]),parseFloat(mesage_aray[2]),Date.now(),mesage_aray[3]);
      console.log(typeof(message.toString()));
    }

    update_message(conection.addres, message.toString());
    update_time(conection.addres);
  });

  ws.on('close', function close() {

    console.log('Client disconnected');
    initiate_check(ws._socket.remoteAddress);
  });
});


function check_for_time()
{
  
  for(let i = 0; i< check_arrray.length; i++)
  {

    if(Date.now() - check_arrray[i].time > 300)//if you are disconected for more than 5minutes (300 sec) enters
    {
      
      const mesage_aray = check_arrray[i].message.split("|");
      db.addClient(parseFloat(mesage_aray[1]),parseFloat(mesage_aray[2]),Date.now(),mesage_aray[3]);
      
      delete_from_array(check_arrray[i].addres);
      remove_from_check(check_arrray[i].addres);
    }   
  }
  
}
setInterval(check_for_time, 1000);
