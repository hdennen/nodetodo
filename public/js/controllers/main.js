// js/controllers/main.js

angular.module('todoController', [])
	//inject service .factory from todos.js
	.controller('mainController', function($scope, $http, Todos) {
		$scope.formData = {};

		//hit api on home GET and render all todos
		Todos.get()
			.success(function(data){
				$scope.todos = data;
			})
/*			.error(function(data) { //for debugging
				console.log('Error: '+ data); //could use this to keep error log
			});*/

		//send text to api on submit
		$scope.createTodo = function(){
			if (!$.isEmptyObject($scope.formData)){ //check field isn't empty
				Todos.create($scope.formData)
					.success(function(data){
						$scope.formData = {} //clear form
						$scope.todos = data;
					})
/*					.error(function(data){ //for debugging
						console.log('Error: ' + data);
					});*/
			}


		};

		// delete a todo on check
		$scope.deleteTodo = function(id){
			Todos.delete(id)
				.success(function(data){
					$scope.todos = data;
				})
/*				.error(function(data) { //for debugging
					console.log('Error: ' + data);
				});*/
		};

	});