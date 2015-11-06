var app = angular.module('myApp')
var childProcess = require('child_process')

var credentials = {email:"craigo@resin.io", password:"cm19905511" };

resin.auth.login(credentials, function(error) {
  if (error != null) {
    throw error;
  }
  console.log("success authenticated with resin API")
});

// polls resin app for all devices data
app.factory('devicesService', function($timeout) {
	var data = {};
    (function tick() {
        resin.models.device.getAllByApplication('applauseMeter',function(error, devices) {
		  if (error != null) {
		    throw error;
		  }
		  data.resp = devices;
		  // console.log(devices)
		});  //1. this returns promise

	$timeout(tick, 500);
  	})();

  	return {
	   data: data
	};
});

