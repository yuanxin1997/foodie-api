# foodie-api

## SAMPLE OF GET REQUEST

###
```javascript
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
```

Test our food details API (e.g chicken rice, duck rice) [HERE](https://foodin-api.herokuapp.com/food/details/duck%20rice)
