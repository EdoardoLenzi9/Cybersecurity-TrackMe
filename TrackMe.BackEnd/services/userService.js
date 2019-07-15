/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


var crypto = require('crypto');
var log = require('../utils/log');
var userRepository = require('../repositories/userRepository');
var sessionRepository = require('../repositories/sessionRepository');
var friendRepository = require('../repositories/friendRepository');
var posRepository = require('../repositories/posRepository');
var sessionService = require('./sessionService');
var mailgun = require("../utils/mailgun");


var create = function(username, mail, password, callback){
    var sha = crypto.createHash('sha256');
    sha.update(password);
    encryptedPassword = sha.digest('hex');
    log.log(password + "   " + encryptedPassword);


    userRepository.create(username, mail, encryptedPassword, function(newUser){
        console.log(JSON.stringify(newUser));
        sendVerificationCode(newUser.verificationCode);
        sessionService.create(newUser.id, callback);
    });
}


var login = function(mail, password, callback){
    var sha = crypto.createHash('sha256');
    sha.update(password);
    encryptedPassword = sha.digest('hex');
    log.log(password + "   " + encryptedPassword);

    userRepository.readByCredentials(mail, encryptedPassword, function(user){
        if(user.verificationCode == ""){
            sessionService.create(user.id, callback);
        } else {
            callback("User doesn't validate check number")
        }
    });
}


var position = function(lat, lng, session, callback){
    sessionRepository.readBySession(session, function(res){
        if(res[0] != undefined){
            posRepository.create(res[0].user_id, lat, lng, callback);
        }
    })
}


var sendVerificationCode = function(mail, code){
    console.log(' Your verification code: ' + code + " " + mail);
    //mailgun unavailable due to trial API KEY restriction
    //mailgun.send(mail, code);
}


var verify = function(session, code, callback){
    console.log("\n\n " + session + " " + code + "  \n\n")
    sessionRepository.readBySession(session, function(res){
        userRepository.verify(res[0].user_id, code, callback);
    })
}


module.exports = {
    create,
    verify,
    login,
    sendVerificationCode,
    position
}