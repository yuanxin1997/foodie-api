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
	console.log('Calling Illness APIs...');
	next();
});
// =============================================================================
 /**
 * TODO USE CASE 1 : GET ALL ILLNESS
 * @param {[]}
 * @return {Illness -> "*" || ""}
 */
// =============================================================================
// #############################################################################
// USE CASE 1 : GET ALL ILLNESS
router.get('/all', function(req, res)  {
  // SQL QUERY
  var request = new Request(
    "select * from illness FOR JSON AUTO",
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
