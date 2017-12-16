// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var router     = express.Router();

const person = require('./js/routes/person');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port


// DEFAULT
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our foodin APIs, have a nice day!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('', router);

// REGISTER OUR ROUTES -------------------------------
app.use('/person', person);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening to port ' + port);
