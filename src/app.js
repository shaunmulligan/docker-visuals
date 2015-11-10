var app = angular.module('myApp', []);
var resin = require("resin-sdk");
var pty = require('pty.js');
var Terminal = require('term.js').Terminal;

rows = process.env.ROWS || 35
cols = process.env.COLS || 100

function animationCtrl($scope, $rootScope) { 
    $(".element").typed({
	  strings: ["git push resin master"],
	  typeSpeed: 25,
	  onStringTyped: function() {
	     setTimeout(function(){
	      $(".animation").hide();
	      $rootScope.$broadcast('start_build');
	     }, 1000);
	  },
	});
}

function terminalCtrl($scope, $rootScope) { 
	$scope.$on('start_build', function(event) {
		$(".tty-wrapper").show();
	    var script = __dirname + '/start.sh'

	    var command = pty.spawn('bash', [script], {
		  name: 'xterm-color',
		  cols: cols,
		  rows: rows,
		});

		var term = new Terminal({
	      cols: cols,
	      rows: rows,
	      screenKeys: true
	    });

	    command.on('data', function(data) {
		  // console.log(data);
		});

	    term.open(document.getElementById('tty'));
		command.pipe(term);

	    command.on('close', function() {
	    	$(".tty-wrapper").hide();
	        $rootScope.$broadcast('start_download');
	    });
	});  
}

function devicesCtrl($scope, $rootScope, devicesService) { 
	$scope.$on('start_download', function(event) {
		console.log("download starting");
		$(".devices-wrapper").show();
		$scope.devices = devicesService.data;
		
		var downloading = true;
		var device = $scope.devices.resp;
		for (var i=0; downloading === true; i++) {

			if (device[i++] != null) {
				if (device[i++].status === "Starting") {
				  	downloading = false;
				  	$(".devices-wrapper").hide();
				  	console.log('download complete');
				  	$rootScope.$broadcast('start_applause');
			    }
			}
		  
		}
	}); 
}

function applauseCtrl($scope, $rootScope, devicesService) {
  $scope.$on('start_applause', function(event) {
  	$(".applause-wrapper").show();
  	console.log("applause");
  	$scope.devices = devicesService.data;
  });
}