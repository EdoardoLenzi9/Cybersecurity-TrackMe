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
    sessionService.validateSession(req.session);
    next();
});


module.exports = {
    router
}