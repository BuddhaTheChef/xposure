angular.module('xposure').controller('searchEventCtrl', function (mainSrvc, response, $scope) {


  $scope.events = response.events;
  // $scope.events = ['test'];
  // $scope.searchEvents = function(city){
  //   mainSrvc.searchEvents($scope.city).then(function(response){
  //     console.log('thtsrho: ',response);
  //     $scope.events = mainSrvc.currentResponse.data.events;
  //     console.log($scope.events)
  //   });
  // }

})
