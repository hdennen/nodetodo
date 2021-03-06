//.server.js

//set up =====================
 var express = require('express');
 var app = express(); //create app with express 
 var mongoose = require('mongoose'); //use mongoose for db comms
 var port = process.env.PORT || 8080; //set port
 var database = require('./config/database'); //load db config file
 var morgan = require('morgan'); // log requests to the console (express4)
 var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
 var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

//config =======================

	mongoose.connect(database.url); //connects to db in database.js

	app.use(express.static(__dirname + '/public'));
	app.use(morgan('dev')); // log every request to the console for debugging
  app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                                     // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
  app.use(methodOverride());

//routes ==========
  require('./app/routes')(app);

	// listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port " + port);