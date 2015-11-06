var app = angular.module('myApp', []);
var resin = require("resin-sdk");

function terminalCtrl($scope)
{ 
    $scope.tty = 'output'
    var spawn = require('child_process').spawn;
    var command = spawn('git', ['push', 'resin', 'master', '--force']);
    var result = '';

    command.stderr.on('data', function(data) {
    	result += data + "</br>"
        $scope.$apply(function(){
	      $scope.tty = result;
	    });
    });
    command.on('error', function () {
	  console.log("Failed to start child.");
	});
    command.on('close', function(code) {
        console.log("callback")
    });

}


// app.controller('devicesCtrl', function( devicesService, $scope) {
//   $scope.devices = devicesService.data;
//   // console.log($scope.devices)
//   // console.log(devicesService.data)

// });