const router = require('express').Router();
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

var connection = require('../db/dbConnection');
var minFunc = require('../min/functions')

// middleware to use for all requests
router.use(function(req, res, next) {
	console.log('Calling Person APIs...');
	next();
});

// =============================================================================
router.get('/checkEmail/:email', function(req, res)  {
  var email = req.params.email;

  // SQL QUERY
  var request = new Request(
    "select * from person where email = @email",
    function(err, rowCount) {
      minFunc.log(err, rowCount)
      if(rowCount == 0){
        res.json({message: 'not exists' });
      } else{
        res.json({message: 'exists' });
      }
    }
  );

  // PARAMETERS --> MUST MATCH TO @[VALUE]
  request.addParameter('email', TYPES.NVarChar, email);

  // EXECUTE
  connection.execSql(request);
});
// =============================================================================
router.get('/login/:email/:password', function(req, res)  {
  var email = req.params.email;
	var password = req.params.password;
  // SQL QUERY
  var request = new Request(
    "select id, name, email, age, height, weight from person where email = @email and password = @password FOR JSON AUTO",
    function(err, rowCount) {
      minFunc.log(err, rowCount)
      if(rowCount == 0){
        res.json({message: 'invalid' });
      }
    }
  );

  // PARAMETERS --> MUST MATCH TO @[VALUE]
  request.addParameter('email', TYPES.NVarChar, email);
	request.addParameter('password', TYPES.NVarChar, password);

	// LISTEN TO ROW RESULTS
	request.on('row', function(columns) {
	   res.json(JSON.parse(columns[0].value));
	});

  // EXECUTE
  connection.execSql(request);
});
// =============================================================================
router.post('/register', function(req, res)  {
  var person = req.body

  // SQL QUERY
  var request = new Request(
    "insert into person (name, email, password, age, weight, height) values(@name, @email, @password, @age, @weight, @height)",
    function(err, rowCount) {
      // NUMBER OF ROWS AFFECTED
      minFunc.log(err, rowCount)
      if(rowCount == 0){
        res.json({message: 'unsucessful' });
      } else{
        res.json({message: 'sucessful' });
      }
    }
  );

  // PARAMETERS --> MUST MATCH TO @[VALUE]
  request.addParameter('name', TYPES.NVarChar, person.name);
	request.addParameter('email', TYPES.NVarChar, person.email);
	request.addParameter('password', TYPES.NVarChar, person.password);
  request.addParameter('age', TYPES.Int, person.age);
  request.addParameter('weight', TYPES.Decimal, person.weight);
  request.addParameter('height', TYPES.Decimal, person.height);

  // EXECUTE
  connection.execSql(request);
});
// =============================================================================

// router.put('/', function(req, res)  {
//   var name = req.body.name
// 	res.json({ message: 'put ' + name + ' ' });
// });
//
// router.delete('/:id', function(req, res)  {
//   var id = req.params.id
// 	res.json({ message: 'delete ' + id + ' ' });
// });

module.exports = router;
