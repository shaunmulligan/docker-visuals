var app = angular.module('myApp')
var childProcess = require('child_process')

var credentials = {email:"craigo@resin.io", password:"cm19905511" };

resin.auth.login(credentials, function(error) {
  if (error != null) {
    throw error;
  }
  console.log("success")
});

app.service('terminalService', function(){
    this.tty = function() {
		// return childProcess.exec('ls -l', function (error, stdout, stderr) {
		// 	console.log(stdout)
		//   	return stdout;
		// });
		return "Terminal output should go here"
    }
});


app.factory('devicesService', function($timeout) {
	var data = {};
    (function tick() {
        resin.models.device.getAll(function(error, devices) {
		  if (error != null) {
		    throw error;
		  }
		  data.resp = devices;
		  // console.log(devices)
		});  //1. this returns promise

	$timeout(tick, 1000);
  	})();

  	return {
	   data: data
	};
});