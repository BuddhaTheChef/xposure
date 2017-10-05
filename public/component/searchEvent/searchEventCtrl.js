angular.module('xposure').controller('searchEventCtrl', function (mainSrvc, $scope) {
      $scope.searchEvents = mainSrvc.searchEvents
})
