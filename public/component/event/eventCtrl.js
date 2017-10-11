angular.module('xposure').controller('eventCtrl', function (mainSrvc, $scope, user) {

  $scope.eventSubmit = (title, location, eventemail, starts, ends, eventimage, eventdescription) => {
    const newEvent = { title, location, eventemail, starts, ends, eventimage, eventdescription, authid: user.authid};
    mainSrvc.eventSubmit(newEvent);
    console.log(newEvent);


  }

})
