# foodie-api

## SAMPLE OF GET REQUEST

###
```javascript
router.get('/login/:email/:password', function(req, res)  {
  var email = req.params.email;
	var password = req.params.password;

  // SQL QUERY
  var request = new Request(
    "select * from person where email = @email and password = @password FOR JSON AUTO",
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
```

Test our login API  [HERE](https://foodin-api.herokuapp.com/person/login/zhiyong@gmail.com/123)
