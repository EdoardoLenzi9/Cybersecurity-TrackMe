/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


var repo = require('../repositories/sessionRepository');
var service = require('../services/sessionService');


var createTest = function(){
    repo.create("session", 4, function(newRecord){
        console.log("creation result: " + JSON.stringify(newRecord))
    })
}


var uniqueTest = function(){
    repo.create("session", 4, function(newRecord){
        repo.readBySession("session", function(records){
            console.log("retrieve result: " + JSON.stringify(records))
        })
    })
}


var createLogicTest = function(){
    service.create(0, function(res){
        console.log(res);
    });
}


var readBySessionTest = function(){
    // userId, Code
    repo.readBySession("4f4f1ba6ec4baf35eace10a1c965fe7f65c6da4da1b41e36dcd7a49acbecda9e", function(newRecord){
        console.log("read result: " + JSON.stringify(newRecord))
    })
}


//setTimeout(repo.drop, 1000);
//setTimeout(repo.sync, 1000);
//setTimeout(createTest, 1000);
//setTimeout(uniqueTest, 1000);
//setTimeout(createLogicTest, 1000);
//setTimeout(readBySessionTest, 1000);


module.exports = {
    createTest,
    readBySessionTest    
}