var app = angular.module('myApp', []);
var resin = require("resin-sdk");

function terminalCtrl($scope, terminalService)
{
    $scope.terminal = terminalService.tty();
}


app.controller('devicesCtrl', function( devicesService, $scope) {
  $scope.devices = devicesService.data;
  console.log($scope.devices)
  // console.log(devicesService.data)

});