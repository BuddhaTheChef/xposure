angular.module('xposure').controller('eventCtrl', function (mainSrvc, $scope, user, $stateParams) {

  $scope.eventSubmit = (title, location, eventemail, starts, ends, eventimage, eventdescription,tags) => {
    const newEvent = { title, location, eventemail, starts, ends, eventimage, eventdescription, authid: user.authid,tags};
    mainSrvc.eventSubmit(newEvent);
    console.log(newEvent);
  }


$scope.categories = mainSrvc.categories;

  

})
