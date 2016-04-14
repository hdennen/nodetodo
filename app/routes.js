// app/routes.js

//load todo model
var Todo = require('./models/todo');

//expose routes to app with module.exports
module.exports = function(app){
	//api---------------
	//get all todos
	app.get('/api/todos', function(req, res){
		//use mongoose to get all the todos in the db
		Todo.find(function(err, todos){
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)
			res.json(todos); // return all todos in JSON format
		});
	});
	
	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res){
		//create todo
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo){
			if (err)
				res.send(err);
			//get and return all todos after making new one
			Todo.find(function(err, todos){
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res){
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo){
				if (err)
				res.send(err);
				//get and return all todos after deleting one
				Todo.find(function(err, todos){
					if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	//application ----------
	app.get('*', function(req, res){
		res.sendfile('./public/index.html'); //load html page base url GET request
	});
}

