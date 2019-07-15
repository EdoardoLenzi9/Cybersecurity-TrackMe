/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


var fs = require('fs');


var log = function(message){
    fs.writeFile("log.log", message, (err) => {
        if (err) console.log(err);
        console.log(message);
    });
}


var logJson = function (object){
    serializedObject = JSON.stringify(object);
    fs.appendFile("log.log", serializedObject, (err) => {
        if (err) console.log(err);
        console.log(JSON.stringify(serializedObject));
    });
}


module.exports = {
    log,
    logJson
}