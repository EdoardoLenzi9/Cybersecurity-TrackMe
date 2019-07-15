/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/
var environment = require("../credentials/environment");
var mailgun = require('mailgun-js')({apiKey: environment.mailgun_key, domain: environment.domain});
 

var send = new function(mail, code){
    var data = {
        from: environment.mail,
        to: mail,
        subject: "your validation code!",
        text: code
    };
    
    mailgun.messages().send(data, function (error, body) {
      	console.log(body);
    }); 
}


module.exports = {
  	send
}