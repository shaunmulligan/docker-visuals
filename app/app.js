var app = angular.module('myApp', []);
var resin = require("resin-sdk");

function animationCtrl($scope, $rootScope) { 
	$scope.$on('start_animation', function(event) {
	    $(".element").typed({
		  strings: ["git push resin master"],
		  typeSpeed: 0,
		  onStringTyped: function() {
		     setTimeout(function(){
		      $(".spash-wrapper").hide();
		      $(".tty-wrapper").show();
		      $rootScope.$broadcast('message', 'Now we build your Application Container');
		     }, 1000);
		  },
		});
	}); 
}

function terminalCtrl($scope, $rootScope) { 
	$scope.$on('start_build', function(event) {
		console.log("shitttx")
		$scope.tty = '<p></p>'
	    var spawn = require('child_process').spawn;
	    var script = __dirname + '/start.sh'
	    console.log(script)
	    var command = spawn('bash', [script]);
	    var result = '';

	    command.stderr.on('data', function(data) {
	    	result += '<p>' + data + '</p>'
	    	
	        $scope.$apply(function(){
		      $scope.tty = result;
		    });
		    // scroll div for new data
		    var elem = document.getElementById('tty');
			elem.scrollTop = elem.scrollHeight;
	    });
	    command.on('error', function () {
		  console.log("Failed to start child.");
		});
	    command.on('close', function(code) {
	        console.log("callback")
	        $(".tty-wrapper").hide();
	        $(".devices-wrapper").show();
	    });
	});  
}

function animationCtrl($scope, $rootScope) { 
	$scope.$on('message', function(event, data) {
		console.log(data);
	});
}


app.controller('devicesCtrl', function( devicesService, $scope) {
  $scope.devices = devicesService.data;
  console.log($scope.devices)
});