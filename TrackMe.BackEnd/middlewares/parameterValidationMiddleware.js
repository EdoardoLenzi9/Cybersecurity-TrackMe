/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/


var express = require('express');
var router = express.Router();


router.use(function (req, res, next) {
    console.log("parameters validation middleware");
    next();
});


module.exports = {
  router
}
