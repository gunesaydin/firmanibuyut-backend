const express = require('express');
const mysql = require('mysql');
const app = express();

const listenPort = process.env.PORT || 3000;


// Temporary check string to test MySQL DB connection
const checkString = 'SELECT * FROM wp_postmeta WHERE post_id > 1330 ORDER BY post_id DESC';


const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DBNAME
});



function closeDbConnection(){
  connection.end(function(err) {
    if(err){console.log('closeDbConnection error:' + err)}
    console.log('Connection ended with remote DB');
  });
}

function getApplications(req, res) {
  connection.query(checkString, function(err, results){
    if(err) {console.log(err)};
    res.send(results);
  });
}

app.get('/', async function(req, res) {
  connection.connect();  
  getApplications(req, res);
  closeDbConnection();
});

app.listen(listenPort, () => console.log('Server listening from PORT: ' + listenPort));