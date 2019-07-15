var express = require('express');
var router = express.Router();

/* Paths */

router.use(express.static('views'));
router.use(express.static('node_modules'));

/* Ruotes */

router.get("/",function(req,res){
  	res.redirect('/login');
});


router.get("/login",function(req,res){
  	res.render("login/login.html");
});


router.get("/check",function(req,res){
    res.render("check/check.html");
});


router.get("/main",function(req,res){
    res.render("main/main.html");
});


router.use("*",function(req,res){
    res.redirect('/login');
});

module.exports = {
    router
}
