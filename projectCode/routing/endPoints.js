var express = require('express');
var log = require('../utils/log');
var userService = require("../services/userService");
var router = express.Router();


/* End Points */
router.post("/user", function(req, res) {
	log.log(req.headers.authorization.replace("Basic ", ""));
	let buffer = Buffer.from(req.headers.authorization.replace("Basic ", ""), 'base64'); 
	let authorization = buffer.toString('ascii');
	var credentials = authorization.split("{:}");
	if(credentials.length == 3){
		var mail = credentials[0];
		var password = credentials[1];
		var username = credentials[2];
		userService.create(username, mail, password, function(session){
			res.send(session)
		})
	} else {
		res.send("error");
	}
});


router.post("/user/login", function(req, res) {
	log.log(req.headers.authorization.replace("Basic ", ""));
	let buffer = Buffer.from(req.headers.authorization.replace("Basic ", ""), 'base64'); 
	let authorization = buffer.toString('ascii');
	var credentials = authorization.split("{:}");
	if(credentials.length == 2){
		var mail = credentials[0];
		var password = credentials[1];
		userService.login(mail, password, function(session){
			res.send(session)
		})
	} else {
		res.send("error");
	}
});


router.post("/user/position", function(req, res) {
	try{
		var lat = req.headers.lat;
		var lng = req.headers.lng;
		var session = req.headers.session
		userService.position(lat, lng, session, function(message){
			res.send(message)
		});
	} catch(e){
		console.log(e);
		res.redirect('/login');
	}
});


router.post("/user/friend", function(req, res) {
	try{
		var email = req.headers.email;
		var session = req.headers.session
		userService.friend(email, session, function(message){
			res.send(message)
		});
	} catch(e){
		console.log(e);
		res.redirect('/login');
	}
});


router.post("/user/verify", function(req, res) {
	log.log("Verify" + req.headers.session);
	log.log(req.headers.code);
	userService.verify(req.headers.session, req.headers.code, function(message){
		res.send(message);
	})
});


module.exports = {
    router
}


