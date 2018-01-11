/**
 * Created by LI YUAN XIN on 16/12/2017.
 */
const router = require('express').Router();
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

var connection = require('../db/dbConnection');
var minFunc = require('../min/functions')

// MIDDLEWARE (use to handle all requests)
router.use(function(req, res, next) {
	console.log('Calling Person APIs...');
	next();
});
// =============================================================================
 /**
 * TODO USE CASE 1 : CHECK EMAIL EXISTS OR NOT (PART A: for registration)
 * @param {[email]} Person
 * @return {message -> 0 || 1}
 */

 /**
 * TODO USE CASE 2 : ADD PERSON ILLNESS (PART B: for registration)
 * @param {[id]} PERSON
 * @param {[id]} ILLNESS
 * @return {message -> 0 || 1}
 */

 /**
 * TODO USE CASE 3 : REGISTER AN ACCOUNT (PART C: for registration)
 * @param {[name, email, password, weight, height, gender, dob]} Person
 * @return {message -> 0 || id}
 */

 /**
 * TODO USE CASE 4 : LOGIN
 * @param {[email, password]} Person
 * @return {Message -> 0 || id}
 */

 /**
 * TODO USE CASE 5 : GET PERSON DETAILS BY ID (after login)
 * @param {[id]} Person
 * @return {Person -> * || ""}
 */

 /**
 * TODO USE CASE 6 : GET PERSON ILLNESS BY ID
 * @param {[id]} Person // 2 INNER JOIN
 * @return {Illness -> "illnessId, illnessName" || ""}
 */

 /**
 * TODO USE CASE 7 : DELETE PERSON ILLNESS
 * @param {[id]} Illness
 * @return {message -> 0 || 1}
 */

 /**
 * TODO USE CASE 8 : LOG FOOD FOR DAILY TRACKING
 * @param {[id]} Person
 * @param {[id]} Food
 * @return {message -> 0 || 1}
 */

/**
 * TODO USE CASE 9 : GET ILLNESS INDICATOR DETAILS BY ID
 * @param {[id]} Person // 3 INNER JOIN
 * @return {Illness_Indicator -> "illnessId, name, maxValue, minValue" || ""}
 */

/**
 * TODO USE CASE 10 : GET PERSON'S LOGGED FOOD details BY ID
 * @param {[id]} Person // 2 INNER JOIN
 * @return {Food -> "name, calories, carbohydrate, fat, protein, vitaminA, vitaminC, sodium, potassium, calcium, iron" || ""}
 */

// =============================================================================
// #############################################################################
// USER CASE 1 : CHECK EMAIL EXISTS OR NOT (PART A: for registration)
router.get('/checkEmail/:email', function(req, res)  {
  var email = req.params.email;

  // SQL QUERY
  var request = new Request(
    "select * from person where email = @email",
    function(err, rowCount) {
      minFunc.log(err, rowCount)
      if(rowCount == 0){
        res.json({message: 0 });
      } else{
        res.json({message: 1 });
      }
    }
  );

  // PARAMETERS --> MUST MATCH TO @[VALUE]
  request.addParameter('email', TYPES.NVarChar, email);

  // EXECUTE
  connection.execSql(request);
});
// #############################################################################
// USE CASE 2 : ADD PERSON ILLNESS (PART B: for registration)
router.post('/addPersonIllness/:personId/:illnessId', function(req, res)  {
  var personId = req.params.personId
	var illnessId = req.params.illnessId

  // SQL QUERY
  var request = new Request(
    "insert into personIllness (personId, illnessId) values(@personId, @illnessId)",
    function(err, rowCount) {
      // NUMBER OF ROWS AFFECTED
      minFunc.log(err, rowCount)
      if(rowCount == 0){
        res.json({message: 0 });
      } else{
        res.json({message: 1 });
      }
    }
  );

  // PARAMETERS --> MUST MATCH TO @[VALUE]
  request.addParameter('personId', TYPES.Int, personId);
  request.addParameter('illnessId', TYPES.Int, illnessId);

  // EXECUTE
  connection.execSql(request);
});
// #############################################################################
// USER CASE 3 : REGISTER AN ACCOUNT (PART C: for registration)
router.post('/register', function(req, res)  {
  var person = req.body

  // SQL QUERY
  var request = new Request(
    "insert into person (name, email, password, weight, height, gender, dob) OUTPUT Inserted.ID values(@name, @email, @password, @weight, @height, @gender, @dob)",
    function(err, rowCount) {
      // NUMBER OF ROWS AFFECTED
      minFunc.log(err, rowCount)
      if(rowCount == 0){
        res.json({message: 0});
      }
    }
  );

  // PARAMETERS --> MUST MATCH TO @[VALUE]
  request.addParameter('name', TYPES.NVarChar, person.name);
	request.addParameter('email', TYPES.NVarChar, person.email);
	request.addParameter('password', TYPES.NVarChar, person.password);
  request.addParameter('weight', TYPES.Decimal, person.weight);
  request.addParameter('height', TYPES.Decimal, person.height);
	request.addParameter('gender', TYPES.NVarChar, person.gender);
	request.addParameter('dob', TYPES.NVarChar, person.dob);

	// LISTEN TO ROW RESULTS
	request.on('row', function(columns) {
		// RETURN PERSON ID
		res.json({message: JSON.parse(columns[0].value)});
	});

  // EXECUTE
  connection.execSql(request);
});
// #############################################################################
// USE CASE 4 : lOGIN
router.get('/login/:email/:password', function(req, res)  {
  var email = req.params.email;
	var password = req.params.password;
  // SQL QUERY
  var request = new Request(
    "select id from person where email = @email and password = @password",
    function(err, rowCount) {
      minFunc.log(err, rowCount)
      if(rowCount == 0){
        res.json({message: 0});
      }
    }
  );

  // PARAMETERS --> MUST MATCH TO @[VALUE]
  request.addParameter('email', TYPES.NVarChar, email);
	request.addParameter('password', TYPES.NVarChar, password);

	// LISTEN TO ROW RESULTS
	request.on('row', function(columns) {
		// RETURN PERSON ID
		res.json({message: JSON.parse(columns[0].value)});;
	});

  // EXECUTE
  connection.execSql(request);
});
// #############################################################################
// USE CASE 5 : GET PERSON DETAILS BY ID (PART A: after login)
router.get('/details/:id', function(req, res)  {
  var id = req.params.id;

  // SQL QUERY
  var request = new Request(
    "select * from person where id = @id FOR JSON AUTO",
    function(err, rowCount) {
      minFunc.log(err, rowCount)
      if(rowCount == 0){
        res.json({});
      }
    }
  );

  // PARAMETERS --> MUST MATCH TO @[VALUE]
  request.addParameter('id', TYPES.Int, id);

	// LISTEN TO ROW RESULTS
	request.on('row', function(columns) {
		res.json(JSON.parse(columns[0].value)[0]);
	});

  // EXECUTE
  connection.execSql(request);
});
// #############################################################################
// USE CASE 6 : GET ILLNESS BY ID
router.get('/getIllness/:id', function(req, res)  {
  var id = req.params.id;
  // SQL QUERY
  var request = new Request(
    "select i.id, i.name "
		+ "from illness i "
		+ "inner join personillness pi on i.id = pi.illnessid "
		+ "inner join person p on pi.personId = p.id "
		+ "where p.id = @id FOR JSON AUTO",
    function(err, rowCount) {
      minFunc.log(err, rowCount)
      if(rowCount == 0){
        res.json({});
      }
    }
  );

	// PARAMETERS --> MUST MATCH TO @[VALUE]
	request.addParameter('id', TYPES.Int, id);

	// LISTEN TO ROW RESULTS
	request.on('row', function(columns) {
	   res.json(JSON.parse(columns[0].value));
	});

  // EXECUTE
  connection.execSql(request);
});
// #############################################################################
// USE CASE 7 : DELETE PERSON ILLNESS
router.delete('/deletePersonIllness/:personId/:illnessId', function(req, res)  {
	var personId = req.params.personId;
	var illnessId = req.params.illnessId;

  // SQL QUERY
  var request = new Request(
    "delete from personIllness where personId = @personId and illnessId = @illnessId",
    function(err, rowCount) {
      minFunc.log(err, rowCount)
			if(rowCount == 0){
        res.json({message: 0 });
      }else {
				res.json({message: 1 });
			}
    }
  );

  // PARAMETERS --> MUST MATCH TO @[VALUE]
  request.addParameter('personId', TYPES.Int, personId);

	request.addParameter('illnessId', TYPES.Int, illnessId);

  // EXECUTE
  connection.execSql(request);
});
// #############################################################################
// USE CASE 8 : LOG PERSON FOOD FOR DAILY TRACKING
router.post('/logPersonFood/:personId/:foodId/:timestamp', function(req, res)  {
	var personId = req.params.personId;
  var foodId = req.params.foodId;
	var timestamp = req.params.timestamp

  // SQL QUERY
  var request = new Request(
    "insert into personFood (personId, foodId, timestamp) values(@personId, @foodId, @timestamp)",
    function(err, rowCount) {
      minFunc.log(err, rowCount)
      if(rowCount == 0){
        res.json({message: 0 });
      } else{
        res.json({message: 1 });
      }
    }
  );

  // PARAMETERS --> MUST MATCH TO @[VALUE]
  request.addParameter('personId', TYPES.Int, personId);
  request.addParameter('foodId', TYPES.Int, foodId);
	request.addParameter('timestamp', TYPES.Int, timestamp);

  // EXECUTE
  connection.execSql(request);
});
// #############################################################################
// USE CASE 9 : GET ILLNESS INDICATOR DETAILS BY ID
router.get('/getIllnessIndicator/:id', function(req, res)  {
  var id = req.params.id;
  // SQL QUERY
  var request = new Request(
    "select ii.illnessId, ii.name, ii.maxValue, ii.minValue "
+ "from illnessIndicator ii "
+ "inner join illness i on ii.illnessId = i.id "
+ "inner join personIllness pi on i.id = pi.illnessId "
+ "inner join person p on pi.personId = p.id "
+ "where p.id = @id FOR JSON AUTO",
    function(err, rowCount) {
      minFunc.log(err, rowCount)
      if(rowCount == 0){
        res.json({});
      }
    }
  );

	// PARAMETERS --> MUST MATCH TO @[VALUE]
	request.addParameter('id', TYPES.Int, id);

	// LISTEN TO ROW RESULTS
	request.on('row', function(columns) {
	   res.json(JSON.parse(columns[0].value));
	});

  // EXECUTE
  connection.execSql(request);
});
// #############################################################################
// USE CASE 10 : GET PERSON'S LOGGED FOOD details BY ID
router.get('/getPersonFood/:id/:start/:end', function(req, res)  {
  var id = req.params.id;
	var start = req.params.start;
	var end = req.params.end;
  // SQL QUERY
  var request = new Request(
    "select f.*"
		+ "from food f "
		+ "inner join personFood pf on f.id = pf.foodId "
		+ "inner join person p on pf.personId = p.id "
		+ "where p.id = @id and pf.timestamp >= @start "
		+ "and pf.timstamp <= @end FOR JSON AUTO",

    function(err, rowCount) {
      minFunc.log(err, rowCount)
      if(rowCount == 0){
        res.json({});
      }
    }
  );

	// PARAMETERS --> MUST MATCH TO @[VALUE]
	request.addParameter('id', TYPES.Int, id);
	request.addParameter('start', TYPES.BigInt, start);
	request.addParameter('end', TYPES.BigInt, end);

	// LISTEN TO ROW RESULTS
	request.on('row', function(columns) {
	   res.json(JSON.parse(columns[0].value));
	});

  // EXECUTE
  connection.execSql(request);
});
// #############################################################################
module.exports = router;
