var app = angular.module('myApp', []);



function terminalCtrl($scope, terminalService)
{
    $scope.terminal = terminalService.tty();
}
