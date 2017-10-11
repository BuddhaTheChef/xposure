angular.module('xposure').controller('eventCtrl', function (mainSrvc, $scope, user, $stateParams) {

  $scope.eventSubmit = (title, location, eventemail, starts, ends, eventimage, eventdescription) => {
    const newEvent = { title, location, eventemail, starts, ends, eventimage, eventdescription, authid: user.authid};
    mainSrvc.eventSubmit(newEvent);
    console.log(newEvent);


  }


  // $scope.showEvent = function(){
  //   console.log($stateParams);
  //   mainSrvc.showEvent($stateParams.id).then(response => {
  //     $scope.createdevents = response[0];
  //     console.log(response);
  //   })
  // }

})
