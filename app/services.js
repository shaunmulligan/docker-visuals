var app = angular.module('myApp')
var childProcess = require('child_process')

var credentials = {email:"craigo@resin.io", password:"cm19905511" };

resin.auth.login(credentials, function(error) {
  if (error != null) {
    throw error;
  }
  console.log("success")
});

function run(cmd, callback) {
    
}

function close(){
	console.log('tty process fin')
}

app.service('terminalService', function($rootScope){
	 this.data = 0
    console.log()

	var spawn = require('child_process').spawn;
    var command = spawn("ls");
    var result = '';
    command.stdout.on('data', function(data) {
         result += data.toString();
         
    });
    command.on('close', function(code) {
        console.log("callback")
	        this.data = result;
	        this.data = 1;
	        console.log(this.data)
	        $rootScope.$apply();
    });
	
});




// app.factory('devicesService', function($timeout) {
// 	var data = {};
//     (function tick() {
//         resin.models.device.getAll(function(error, devices) {
// 		  if (error != null) {
// 		    throw error;
// 		  }
// 		  data.resp = devices;
// 		  // console.log(devices)
// 		});  //1. this returns promise

// 	$timeout(tick, 1000);
//   	})();

//   	return {
// 	   data: data
// 	};
// });