/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


var dbManager = require('./dbManager');
var db = dbManager.db;


var Friend = db.define('friend', {
    id:             {type: 'number', key: true}, // the auto-incrementing primary key
    user_id:        {type: 'number'},
    friend_id:      {type: 'number'},
    state:          {type: 'text'}
  }, {
    methods : {
    }
});


var sync = function(){
    Friend.sync(function () {
        console.log("Friend table synchronized")
    });
}


sync();


var create = function(userId, friendId, callback){
    Friend.count({}, function(err, last_id) {
        var newFriend = new Friend({
            id: last_id,
            user_id: userId,
            friend_id: friendId,
            state: "to_be_validated"
        });

        newFriend.save(function (err) {
            // err.field = "name" , err.value = "" , err.msg = "missing"
        });

        callback(newFriend);
    })
}


var readByUserId = function(userId, callback){
    Friend.find({user_id:userId}, function(err, results) {
        callback(results);
    });
}


var drop = function(){
    Friend.drop(function () { })
}


module.exports = {
    create,
    readByUserId,
    drop,
    sync
}