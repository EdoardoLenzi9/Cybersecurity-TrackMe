/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


var express = require('express');
var sessionService = require('../services/sessionService');
var router = express.Router();

var bodyParser = require('body-parser')
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


router.use(function (req, res, next) {
	console.log("Authentication middleware receive: " + req.method + " on url " + req.url)
	if(req.method != 'GET'){
		sessionService.validateSession(req.session, function(validation){
			if(validation == "error"){
				res.send("error");
			} else{
				next();
			}
		});
	} else {
		next();	
	}
});


module.exports = {
    router
}