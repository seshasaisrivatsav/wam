var express = require('express');
// parses cookies for root scope. To keep the session, we need info
// in cookies
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport'); //core passport library initialized here
var app = express();

// var connectionString = 'mongodb://127.0.0.1:27017/taportal';
var connectionString = 'mongodb://sesha:sesha@ds113505.mlab.com:13505/webdev';

var mongoose = require("mongoose");
mongoose.connect(connectionString);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* VVVIP : session has to be initialized AFTER Cookie Parser */
app.use(cookieParser());
app.use(session({secret: "asdfsfsdf"}));


// First initialize passport and then tell it to use the express    session
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

//var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
//var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var port = process.env.PORT || 3000;

var assignment = require("./assignment/app.js");
assignment(app);


//app.listen(port, ipaddress);

app.listen(port,() => console.log(`API running on localhost:${port}`));


module.exports = app;
