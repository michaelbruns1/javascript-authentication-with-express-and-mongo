require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var app = express();


// mongodb connection
mongoose.connect(`${process.env.MOGNO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true }); // connect to mongodb
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});


// use sessions for tracking logins
var session = require('express-session'); // npm install express-session
app.use(session( { 
  secret: process.env.SESSION_SECRET, // secret key
  resave: true,  // save session even if not modified
  saveUninitialized: false // don't save unmodified session
}));

// make user ID available in templates
app.use(function (req, res, next) { 
  res.locals.currentUser = req.session.userId; // set local variable
  next();
});

// parse incoming requests
app.use(express.json()); // parse json
app.use(express.urlencoded({ extended: true })); // parse form data

// serve static files from /public
app.use(express.static(__dirname + '/public')); // serve static files

// view engine setup
app.set('view engine', 'pug'); // set up pug
app.set('views', __dirname + '/views'); // set up views folder

// include routes
var routes = require('./routes/index.js'); // include routes
app.use('/', routes); // use routes

// catch 404 and forward to error handler
app.use(function(req, res, next) { // 404 error handler
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) { // error handler
  res.status(err.status || 500); 
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listen on port 3000
app.listen(3000, function () { // listen on port 3000
  console.log('Express app listening on port 3000');
});
