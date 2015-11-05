var app = angular.module('myApp')
 var childProcess = require('child_process')


app.service('terminalService', function(){
    this.tty = function() {
		// return childProcess.exec('ls -l', function (error, stdout, stderr) {
		// 	console.log(stdout)
		//   	return stdout;
		// });
		return "Terminal output should go here"
    }
});