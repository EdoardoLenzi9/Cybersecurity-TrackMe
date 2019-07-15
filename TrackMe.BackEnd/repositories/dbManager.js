/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


var orm = require('orm');
var envoriment = require('environment');

var db = orm.connect(environment.database);


db.on('connect', function(err) {
  if (err) return console.error('Connection error: ' + err);
  console.log('db connection established')
});


module.exports = {
    db
};
