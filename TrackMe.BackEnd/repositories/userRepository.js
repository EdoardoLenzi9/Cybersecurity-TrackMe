/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


var dbManager = require('./dbManager');
var db = dbManager.db;


var User = db.define('user', {
    id:                 {type: 'number', key: true}, // the auto-incrementing primary key
    username:           {type: 'text'},
    mail:               {type: 'text'},
    password:           {type: 'text'},
    verificationCode:   {type: 'text'},
    attempts:           {type: 'number'},
    last_attempt:       {type: 'number'},
}, {
    methods : {
    }
});


var sync = function(){
    User.sync(function () {
        console.log("user table synchronized")
    });
}


sync();


var create = function(username, mail, password, callback){
    User.count({}, function(err, last_id) {
        var newUser = new User({
            id: last_id,
            username: username,
            mail: mail,
            password: password,
            verificationCode: "" + Math.floor(Math.random() * 100000),
            attempts: 0,
            last_attempt: Date.now()  
        });

        newUser.save(function (err) {
            // err.field = "name" , err.value = "" , err.msg = "missing"
        });

        callback(newUser);
    });
}


var readById = function(id, callback){
    User.find({id:id}, 1, function(err, results) {
        callback(results[0]);
    });
}


var readByCredentials = function(mail, password, callback){
    User.find({mail:mail, password:password}, 1, function(err, results) {
        callback(results[0]);
    });
}


var verify = function(userId, code, callback){
    readById(userId, function(user){
        if(user.verificationCode == code){
            user.verificationCode = "";
            user.save(function (err) { });
            callback("ok")
        } else{
            user.attempts += 1;
            user.last_attempt = Date.now();
            user.save(function (err) { });
            callback("error" + user.attempts + " " + user.last_attempt)
        }
    })
}


var drop = function(){
    User.drop(function () { })
}


module.exports = {
    User,
    create,
    readById,
    readByCredentials,
    verify,
    drop,
    sync
}