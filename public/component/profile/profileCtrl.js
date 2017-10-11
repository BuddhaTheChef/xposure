angular.module('xposure').controller('profileCtrl', function (mainSrvc, $scope, user) {


$scope.user = user.data && user.data.err ? user.data.err : user;

$scope.updateUser = (first,last,email) => {
  const updatedUser = { first, last, email };
  mainSrvc.updateUser(updatedUser).then(result => {
    console.log(result);
    $scope.user = result.data[0];
  })
}

////////////////////////////////firebase////////////////////////////////

$scope.profilePicSubmit = (first, last, email, file) => {

  console.log(first,last,email,file,user.authid)
  mainSrvc.profilePicSubmit(first,last,email,file, user).then(result => {
    console.log(result);
    $scope.profilePic= result.data[0].profilepic
  })
}


    $scope.eventList = mainSrvc.eventList;



})
