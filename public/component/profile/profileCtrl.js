angular.module('xposure').controller('profileCtrl', function(mainSrvc, $scope, user) {


  $scope.user = user.data && user.data.err ? user.data.err : user;

  $scope.updateUser = (first, last, email) => {
    const updatedUser = {
      first,
      last,
      email
    };
    mainSrvc.updateUser(updatedUser).then(result => {
      console.log(result);
      $scope.user = result.data[0];
    })
  }

  ////////////////////////////////firebase////////////////////////////////

  $scope.profilePicSubmit = (first, last, email, file) => {

    console.log(first, last, email, file, user.authid)
    mainSrvc.profilePicSubmit(first, last, email, file, user).then(result => {
      console.log(result);
      $scope.profilePic = result.data[0].profilepic
      mainSrvc.getUser()
        .then(response => mainSrvc.currentUser = response.data[0])
        .catch(err => err)
    })

  }



  mainSrvc.showEvent(user.authid).then(result => {
    console.log(result);
    $scope.myEvents = result;
  })

  $scope.deleteEvent = (event) => {
    mainSrvc.deleteEvent(event).then(result =>{
      console.log(result, "DELLEEETTEED");
      mainSrvc.showEvent(user.authid).then(result => {
        console.log(result);
        $scope.myEvents = result;
      })
    })

  }

$scope.clickedEvents = 'saved';


  $scope.eventList = mainSrvc.eventList;


  mainSrvc.showSavedEvent(user.authid).then(result => {
    console.log(result);
    $scope.mySavedEvents = result;
  })


  $scope.deleteSavedEvent = (event) => {
    mainSrvc.deleteSavedEvent(event).then(result =>{
      console.log(result, "DELLEEETTEED SAVEEEEDDDD");
      mainSrvc.showSavedEvent(user.authid).then(result => {
        console.log(result);
        $scope.mySavedEvents = result;
      })
    })
  }

$scope.myEvents = [];

$scope.mySavedEvents = [];



  // $scope.items;
  // [
  //     { title: "One", image: "http://placehold.it/560x290/ffccff" },
  //     { title: "Two", image: "http://placehold.it/560x290/66ffcc" },
  //     { title: "Three", image: "http://placehold.it/560x290/66ffff" },
  //     { title: "Four", image: "http://placehold.it/560x290/ffff99" },
  //     { title: "Five", image: "http://placehold.it/560x290/ffcccc" },
  //     { title: "Six", image: "http://placehold.it/560x290/ccffcc" },
  //     { title: "Seven", image: "http://placehold.it/560x290/99ddff" }
  //   ];









})
