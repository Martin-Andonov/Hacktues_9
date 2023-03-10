const mysql = require('mysql');

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: '10.1.79.77',
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

  addClient(lang, lat, date){
    var sql = `INSERT INTO \`resqme\`(\`latitude\`, \`longitute\`, \`id\`, \`date\`) VALUES ('${lang}','${lat}', NULL, '${date}')`;
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

  getAllCoords(){
    const query = `SELECT latitude, longitute FROM resqme`;

    this.connection.query(query, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  }
}
// const db = new Database();
// db.connect();
// db.addClient(42.2, 41.1, 123);
// db.getAllCoords();
// db.getInfo(0);
