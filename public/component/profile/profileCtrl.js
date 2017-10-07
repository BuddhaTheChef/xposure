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

////////////////////////////////firebase////////////////////////////////


$scope.submit = (file) => {
      console.log(file)
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child('images/' + file.name).put(file);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      const downloadURL = uploadTask.snapshot.downloadURL;
      console.log(downloadURL, "done");
    });
    }






})
