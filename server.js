var express = require('express');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport'); //core passport library initialized here
var app = express();

var connectionString = 'mongodb://sesha:sesha@ds113505.mlab.com:13505/webdev';
//var connectionString = 'mongodb://127.0.0.1:27017/webdev-assignment'; // To Run on local



// To Run on OpenShift
/*
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
*/


var mongoose = require("mongoose");
mongoose.connect(connectionString);


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* VVVIP : session has to be initialized AFTER Cookie Parser */
app.use(cookieParser());
// app.use(session({secret: process.env.SESSION_SECRET})); -- Create Session Sec
app.use(session({secret: "aasdasd"}));


// First initialize passport and then tell it to use the express    session
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


//require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
// var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var port      =  3000;
var port = process.env.PORT || port;



var assignment = require("./assignment/app.js");
assignment(app);

// To Run Project
// var project = require("./project/app.js");
// project(app);




//app.listen(port, ipaddress);
app.listen(port , () => console.log(`API running on localhost:${port}`));
