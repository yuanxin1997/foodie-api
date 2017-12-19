// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var defaultRoute     = express.Router();

// call the routes required
const person = require('./js/routes/person');
const illness = require('./js/routes/illness');
const food = require('./js/routes/food');

// set our port
var port = process.env.PORT || 8080;

// log requests to the console
app.use(morgan('dev'));

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DEFAULT ROUTE
defaultRoute.get('/', function(req, res) {
    res.json({ message: 'Welcome to foodin APIs, have a nice day!' });
});

// REGISTER OUR ROUTES -------------------------------
app.use('', defaultRoute);
app.use('/person', person);
app.use('/illness', illness);
app.use('/food', food);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening to port ' + port);
