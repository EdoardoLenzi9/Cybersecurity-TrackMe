/*
*  {  
*    author = "edoardo lenzi"
*    license = "GPL-3"
*  }
*/

var debug = require('debug')('expressdebug:server')
const https = require('https');
const fs = require('fs');

/* Express */
var express = require('express');
var app = express();


/* Cors */
const cors = require('cors');
app.use(cors());
app.options('*', cors());


/* Static Declarations */
var port = 8443;
const options = {
    key: fs.readFileSync('credentials/key.pem'),
    cert: fs.readFileSync('credentials/cert.pem')
};


/* Init router */
var authenticationMiddleware = require(__dirname + '/middlewares/authenticationMiddleware.js');
var parameterValidationMiddleware = require(__dirname + '/middlewares/parameterValidationMiddleware.js');
var routes = require(__dirname + '/routing/routes.js');
var endPoints = require(__dirname + '/routing/endPoints.js');


/* Middelwares and routing */
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use("/", authenticationMiddleware.router);
app.use("/", parameterValidationMiddleware.router);
app.use("/", endPoints.router);
app.use("/", routes.router);
    

/* Start Server */
var httpsServer = https.createServer(options, app);
httpsServer.listen(port, function(){
    console.log("server running at https://localhost:" + port)
});
