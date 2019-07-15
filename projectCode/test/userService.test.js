/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


var service = require('../services/userService');


var signinTest = function(){
    service.create("username", "mail", "password", function(session){
        console.log(session)
    })
}


var validationTest = function(){
    service.verify("deff2c41b071b142b2d53ff41d13b9e19b4e2c0e0b2402ef6bbcf36588b20fa2", "97930", function(res){
        console.log(res)
    })
}


var loginTest = function(){
    service.login("mail", "password", function(res){
        console.log(res)
    })
}


var positionTest = function(){
    service.position(12.3456, 12.3456, "deff2c41b071b142b2d53ff41d13b9e19b4e2c0e0b2402ef6bbcf36588b20fa2", function(res){
        console.log(res)
    })
}


setTimeout(signinTest, 1000);
setTimeout(validationTest, 1000);
setTimeout(loginTest, 1000);
setTimeout(positionTest, 1000);


module.exports = {
    signinTest,
    validationTest,
    loginTest
}