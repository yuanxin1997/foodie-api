// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

const person = require('./js/routes/person');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// REGISTER OUR ROUTES -------------------------------
app.use('/person', person);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening to port ' + port);
