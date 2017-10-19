angular.module('xposure').controller('searchEventCtrl', function (mainSrvc, response, $scope,user) {

console.log(response, "THIS SUCCKKKS")
  $scope.events = response.events;

  $scope.location = response.location;

$scope.categories = mainSrvc.categories;

  $scope.addEventList = function(event){
        mainSrvc.eventList.unshift(event)
        console.log(mainSrvc.eventList)
      }
  // $scope.events = ['test'];
  // $scope.searchEvents = function(city){
  //   mainSrvc.searchEvents($scope.city).then(function(response){
  //     console.log('thtsrho: ',response);
  //     $scope.events = mainSrvc.currentResponse.data.events;
  //     console.log($scope.events)
  //   });
  // }
  $scope.savedEventSubmit  = (event) => {
    const newEventSaved = { title: event.name.text,location:($scope.location.augmented_location.city +", "+ $scope.location.augmented_location.region),start:event.start.local,description:event.description.text,authid: user.authid,image:event.logo.original.url,ends:event.end.local};
    mainSrvc.savedEventSubmit (newEventSaved);
    console.log(newEventSaved);
  }

  mainSrvc.showEvent(user.authid).then(result => {
    console.log("post to events",result);
    $scope.myEvents = result;
  }).catch(err => console.log(err));



})
