var app = angular.module('myApp', []);
var resin = require("resin-sdk");
var pty = require('pty.js');
var Terminal = require('term.js').Terminal;

rows = process.env.ROWS || 20
cols = process.env.COLS || 80

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
	        $rootScope.$broadcast('start_download');
	        $(".tty-wrapper").hide();
	    });
	});  
}

function devicesCtrl($scope, $rootScope, devicesService) { 
	$scope.$on('start_download', function(event) {
		console.log("download starting");
		$(".devices-wrapper").show();
		$scope.devices = devicesService.data;
		$scope.download_status

		$scope.$watch('devices', function (newDevice, oldDevice) {
			console.log(newDevice.resp[0].status)
		 	if (newDevice.resp[0].status == "Starting") {
		 		$(".devices-wrapper").hide();
			 	console.log('download complete');
			  	$rootScope.$broadcast('start_applause');
		 	}
		}, true);
	}); 
}

function applauseCtrl($scope, $rootScope, devicesService) {
	$scope.$on('start_applause', function(event) {
	  	$(".applause-wrapper").show();
	  	console.log("applause");
	  	$scope.devices = devicesService.data;

	  	var pubnub = PUBNUB({
		    subscribe_key: 'sub-c-3bd403c8-0ec0-11e5-a5c2-0619f8945a4f'
		});

		var devices = $scope.devices.resp
		var channel_list = []
		console.log(devices)

		$scope.meters = {};

		for (i = 0; i < devices.length; i++) { 
		    channel_list.push(devices[i].uuid);
		    // $scope.meters.
		    console.log("looping");
		    if (i == devices.length - 1) {
		    	// subscribe to channels
		    	console.log("looping-fin");
		    	console.log(channel_list);
		    	pubnub.subscribe({
				    channel: channel_list,
				    message: function(m, env, ch){
				    	console.log(m)
				    	console.log(ch)
				    	$scope.$apply(function () {
				    		$scope.meters[ch] = m;
				    		console.log($scope.meters)
				        });
				    },
				    error: function (error) {
				      // Handle error here
				      console.log(JSON.stringify(error));
				    }
				});
		    }
		}
  });
}