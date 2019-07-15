/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


var dbManager = require('./dbManager');
var user = require('./userRepository');
var User = user.User;
var db = dbManager.db;


var Session = db.define('session', {
    id:             {type: 'number', key: true}, // the auto-incrementing primary key
    user_id:        {type: 'number'},
    session:        {type: 'text'},
    startTime:      {type: 'text'}
  }, {
    methods : {
    }
});
Session.hasOne("user", User);


var sync = function(){
    Session.sync(function () {
        console.log("session table synchronized")
    });
}


sync();


var create = function(session, userId, callback){
    Session.count({}, function(err, last_id) {
        var newSession = new Session({
            id: last_id,
            session: session,
            user_id: userId,
            startTime: Date.now()
        });

        newSession.save(function (err) {
            // err.field = "name" , err.value = "" , err.msg = "missing"
        });

        callback(newSession);
    })
}


var readBySession = function(session, callback){
    Session.find({session:session}, 1, function(err, results) {
        callback(results);
    });
}


var drop = function(){
    Session.drop(function () { })
}


module.exports = {
    create,
    readBySession,
    drop,
    sync
}