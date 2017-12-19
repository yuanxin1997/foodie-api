/**
 * Created by LI YUAN XIN on 16/12/2017.
 */
var Connection = require('tedious').Connection;

// Create connection to database
var config = {
  userName: 'yuanxin', // update me
  password: 'yx_HERO123', // update me
  server: 'yuanxin-sqldb.database.windows.net', // update me
  options: {
    database: 'yuanxin-sqldb' //update me
      ,
    encrypt: true
  }
}
var connection = new Connection(config);

// Attempt to connect
connection.on('connect', function(err) {
  if (err) {
    console.log('Error connecting to DB: ' + err)
  } else {
    console.log('Connection Established')
  }
});

// Attempt to debug
connection.on('debug', function(err) {
   console.log('debug:', err);
 });

module.exports = connection;
