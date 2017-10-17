angular.module('xposure').controller('indexCtrl', function (mainSrvc, $scope) {

  // $scope.user = user.data && user.data.err ? user.data.err : user;
// console.log(user, "hello user from index")

mainSrvc.getUser()
  .then(response => $scope.user = response.data)
  .catch(err => err)


 })
