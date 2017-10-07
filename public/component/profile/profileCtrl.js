angular.module('xposure').controller('profileCtrl', function (mainSrvc, $scope, user) {

console.log(user)
$scope.user = user.data && user.data.err ? user.data.err : user;
  // $scope.updateUser = user;
  //
  // console.log("yooo",user);
  //
  // return user;
  $scope.updateUser = (user) => {

    mainSrvc.updateUser(user).then(response => {
      console.log(response)
      $scope.updatedUser = response;
    });
  }

})
