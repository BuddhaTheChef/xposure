angular.module('xposure').controller('searchEventCtrl', function (mainSrvc, response, $scope,user) {

console.log(response, "THIS SUCCKKKS")
  $scope.events = response.events;
  console.log($scope.events);

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
    console.log("post to events this",result);
    $scope.myEvents = result;
    $scope.allMyEvents = result;
    return result;
  }).catch(err => console.log(err));

  $scope.dateFilter = (value) => {
    console.log("dateFilter value:",value)
  }


// $scope.categoriesFilter = mainSrvc.categories.filter(id => categories.id);



  $scope.showTodayEvents = () => {
    $scope.events = mainSrvc.showTodayEvents(response.events);
    $scope.myEvents = mainSrvc.showTodayEvents($scope.allMyEvents)
  }

  $scope.showNextWeekEvents = () => {
    $scope.events = mainSrvc.showNextWeekEvents(response.events)
    $scope.myEvents = mainSrvc.showNextWeekEvents($scope.allMyEvents)
  }

  $scope.showThisMonthEvents = () => {
    $scope.events = mainSrvc.showThisMonthEvents(response.events)
    $scope.myEvents = mainSrvc.showThisMonthEvents($scope.allMyEvents)
  }

  $scope.showNextMonthEvents = () => {
    $scope.events = mainSrvc.showNextMonthEvents(response.events)
    $scope.myEvents = mainSrvc.showNextMonthEvents($scope.allMyEvents)
  }

  $scope.showTomorrowEvents = () => {
    $scope.events = mainSrvc.showTomorrowEvents(response.events)
    $scope.myEvents = mainSrvc.showTomorrowEvents($scope.allMyEvents)
  }

  $scope.showThisWeekEvents = () => {
    $scope.events = mainSrvc.showThisWeekEvents(response.events)
    $scope.myEvents = mainSrvc.showThisWeekEvents($scope.allMyEvents)
  }




  $scope.showAllEvents = () => {
    $scope.myEvents = $scope.allMyEvents;
    $scope.events = response.events;
  }










})
