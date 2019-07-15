/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


var dbManager = require('./dbManager');
var db = dbManager.db;


var Pos = db.define('pos', {
    id:             {type: 'number', key: true}, // the auto-incrementing primary key
    user_id:        {type: 'number'},
    lat:            {type: 'number'},
    lng:            {type: 'number'},
    time:           {type: 'number'}
  }, {
    methods : {
    }
});


var sync = function(){
    Pos.sync(function () {
        console.log("Pos table synchronized")
    });
}


sync();


var create = function(userId, lat, lng, callback){
    Pos.count({}, function(err, last_id) {
        var newPos = new Pos({
            id: last_id,
            user_id: userId,
            lat: lat,
            lng: lng,
            time: Date.now()
        });

        newPos.save(function (err) {
            // err.field = "name" , err.value = "" , err.msg = "missing"
        });

        callback(newPos);
    })
}


var readByUserId = function(userId, callback){
    Pos.find({user_id:userId}, function(err, results) {
        callback(results);
    });
}


var drop = function(){
    Pos.drop(function () { })
}


module.exports = {
    create,
    readByUserId,
    drop,
    sync
}