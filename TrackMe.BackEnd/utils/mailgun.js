/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


var mailgun = require('mailgun-js')({apiKey: environment.api_key, domain: environment.domain});
 
var data = {
  from: environment.mail,
  to: user.mail,
  subject: "your validation code!",
  text: user.validationCode
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
}); 