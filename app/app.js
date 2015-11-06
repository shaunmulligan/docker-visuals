var app = angular.module('myApp', []);
var resin = require("resin-sdk");
var pty = require('pty.js');
var Terminal = require('term.js').Terminal;



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
		  cols: 80,
		  rows: 30,
		});

		var term = new Terminal({
	      cols: 80,
	      rows: 24,
	      screenKeys: true
	    });

	    command.on('data', function(data) {
		  console.log(data);
		});

	    vph = $(window).height();

	    term.open(document.getElementById('tty'));
		command.pipe(term);

	    command.on('close', function() {
	        console.log("callback")
	        $(".tty-wrapper").hide();
	        $('.devices-wrapper').show();
	    });
	});  
}

app.controller('devicesCtrl', function( devicesService, $scope) {
  $scope.devices = devicesService.data;
  console.log($scope.devices)
});

