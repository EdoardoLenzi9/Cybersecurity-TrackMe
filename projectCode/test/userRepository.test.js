/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


var repo = require('../repositories/userRepository');


var createTest = function(){
    repo.create("username", "mail", "password", function(newRecord){
        console.log("creation result: " + JSON.stringify(newRecord))
    })
}


var verifyTest = function(){
    // userId, Code
    repo.verify(0, "51439", function(newRecord){
        console.log("creation result: " + JSON.stringify(newRecord))
    })
}


var readByIdTest = function(){
    // userId, Code
    repo.readById(0, function(newRecord){
        console.log("read result: " + JSON.stringify(newRecord))
    })
}


var readByCredentialsTest = function(){
    repo.readByCredentials("mail", "password", function(res){
        console.log("readByCredentials user:" + JSON.stringify(res));
    })
}


setTimeout(repo.drop, 1000);
setTimeout(repo.sync, 1000);
setTimeout(createTest, 1000);
setTimeout(verifyTest, 1000);
setTimeout(readByIdTest, 1000);
setTimeout(readByCredentialsTest, 1000);



module.exports = {
    createTest,
    verifyTest,
    readByIdTest,
    readByCredentialsTest
}