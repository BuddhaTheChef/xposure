angular.module('xposure').controller('searchEventCtrl', function (mainSrvc, response, $scope) {

console.log(response, "THIS SUCCKKKS")
  $scope.events = response.events;

  $scope.location = response.location;


  $scope.addEventList = function(event){
        mainSrvc.eventList.unshift(event)
        console.log(mainSrvc.eventList)
      }
  // $scope.events = ['test'];
  // $scope.searchEvents = function(city){
  //   mainSrvc.searchEvents($scope.city).then(function(response){
  //     console.log('thtsrho: ',response);
  //     $scope.events = mainSrvc.currentResponse.data.events;
  //     console.log($scope.events)
  //   });
  // }

})
