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


let allowedRoutes = new Set();
allowedRoutes.add('/login');
allowedRoutes.add('/user');
allowedRoutes.add('/user/login');
allowedRoutes.add('/user/verify');


router.use(function (req, res, next) {
	console.log("Authentication middleware receive: " + req.method + " on url " + req.url)
	if(req.method != 'GET' && !allowedRoutes.has(req.url)){
		console.log("Request under validation");
		sessionService.validateSession(req.session, function(validation){
			console.log("Request validation response" + JSON.stringify(validation));
			if(validation == "error"){
				res.send('error')
			} else{
				next();
			}
		});
	} else {
		console.log("Allowed safe request")
		next();	
	}
});


module.exports = {
    router
}