angular.module('xposure').controller('searchEventCtrl', function (mainSrvc, $scope) {
      $scope.searchEvents = mainSrvc.searchEvents;

      mainSrvc.searchEvents().then(function(response){
        console.log(response);
        $scope.events = response;
      })

})
