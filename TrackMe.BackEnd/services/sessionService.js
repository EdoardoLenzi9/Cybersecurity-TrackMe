/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


var crypto = require('crypto');
var sessionRepository = require('../repositories/sessionRepository')


var create = function(userId, callback){
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    var newSession = sha.digest('hex');

    sessionRepository.readBySession(newSession, function(records){
        if( records.length == 0 ){
            sessionRepository.create(newSession, userId, function(newRecord){
                callback(newRecord.session);
            });
        } else {
            create(userId, callback);
        }
    });
}


var validateSession = function(session, callback){
   sessionRepository.readBySession(session, function(res){
        if(res.length == 1){
            callback("ok");
        } else {
            callback("error");
        }
    });
}


module.exports = {
    create,
    validateSession
}