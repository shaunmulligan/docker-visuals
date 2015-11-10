var app = angular.module('myApp')
var childProcess = require('child_process')

var credentials = {email:"unicorn@resin.io", password:"resin.io"};

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
        resin.models.device.getAllByApplication('dockerCon',function(error, devices) {
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

