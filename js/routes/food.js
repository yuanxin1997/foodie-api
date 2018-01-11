/**
 * Created by LI YUAN XIN on 18/12/2017.
 */
const router = require('express').Router();
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

var connection = require('../db/dbConnection');
var minFunc = require('../min/functions')

// MIDDLEWARE (use to handle all requests)
router.use(function(req, res, next) {
	console.log('Calling Food APIs...');
	next();
});
// =============================================================================
/**
* TODO USE CASE 1 : GET ALL FOOD NAME
* @param {[]}
* @return {Food -> "*" || ""}
*/

 /**
 * TODO USE CASE 2 : GET FOOD DETAILS BY NAME
 * @param {[name]} Food
 * @return {Food -> "*" || ""}
 */
// =============================================================================
// #############################################################################
// USE CASE 1 : GET FOOD DETAILS BY NAME
router.get('/details/:name', function(req, res)  {
  var name = req.params.name;

  // SQL QUERY
  var request = new Request(
    "select * from food where name = @name FOR JSON AUTO",
    function(err, rowCount) {
      minFunc.log(err, rowCount)
      if(rowCount == 0){
        res.json({});
      }
    }
  );

  // PARAMETERS --> MUST MATCH TO @[VALUE]
  request.addParameter('name', TYPES.NVarChar, name);

	// LISTEN TO ROW RESULTS
	request.on('row', function(columns) {
	   res.json(JSON.parse(columns[0].value)[0]);
	});

  // EXECUTE
  connection.execSql(request);
});
// #############################################################################
// USE CASE 2 : GET ALL FOOD NAME
router.get('/allName', function(req, res)  {
  // SQL QUERY
  var request = new Request(
    "select name from food FOR JSON AUTO",
    function(err, rowCount) {
      minFunc.log(err, rowCount)
      if(rowCount == 0){
        res.json({});
      }
    }
  );

	// LISTEN TO ROW RESULTS
	request.on('row', function(columns) {
	   res.json(JSON.parse(columns[0].value));
	});

  // EXECUTE
  connection.execSql(request);
});
// #############################################################################
module.exports = router;
