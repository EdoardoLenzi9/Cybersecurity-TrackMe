/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


var orm = require('orm');
var environment = require('../credentials/environment');

var db = orm.connect(environment.db);


db.on('connect', function(err) {
    if (err) return console.error('Connection error: ' + err);
    console.log('db connection established')
});


module.exports = {
    db
};
