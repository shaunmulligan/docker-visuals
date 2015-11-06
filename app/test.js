var myAppModule = angular.module("myApp", []);

myAppModule.controller('MyController', function($scope, pollingService) {
    
  $scope.data = pollingService.data;

});

myAppModule.factory("pollingService", function ($http, $timeout) {

  var data = { resp: {}, count: 0};
  var count = 0;
  var poller = function() {
    count++;
    $http.get('data.json').then(function(r) {

      data.resp = r.data;
      data.count=count;
      console.log(data);
      $timeout(poller, 500);
    });
    
  };
  poller();
  
  return {
    data: data
  };

app.controller('devicesCtrl', function( devicesService, $scope) {
  $scope.devices = {}
  devicesService.async().then(function(d) { //2. so you can use .then()
    $scope.$apply(function() {
      $scope.devices = d;
      console.log(d[0])
  });
  });
});
/*
  return { 
    
    GetData: function() {
      var deferred = $q.defer();
      //$httpBackend.when('GET', '/data.json').respond("0");

      $http({
         method: 'GET',
         url: "data.json"
      }).then(
          function success(r) {
              var random = Math.floor((Math.random()*10)+1);
              console.log(r.data);
              deferred.resolve(Number(r.data) + random);
              $timeout(GetData, 500);
          },
          function error(r) {
              console.log("err" + r);
              deferred.reject();
              //$timeout(GetData, 3000);
          }
      );
      
      
      
      
      
      return deferred.promise;
      
    }
    
    //GetData();
    
  };*/

});