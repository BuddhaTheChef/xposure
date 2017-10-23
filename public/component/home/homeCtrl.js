angular.module('xposure').controller('homeCtrl', function($scope, user, mainSrvc,response) {
  // user comes from resolve, will either be the user obj or error message we send from server
  console.log(user);
  // if user.data and user.data.err then user = err
  // else user = user object from database


$scope.categories = mainSrvc.categories;

  $scope.user = user.data && user.data.err ? user.data.err : user;

  $scope.dateFilter = (value) => {
    console.log('dateFilter value', value)
    if( value == 'today' ){
      return $scope.filteredDates = new Date().toString()
    } else if ( value == 'tomorrow' ){
      let today = new Date()
      return $scope.filteredDates = today.setDate(today.getUTCDate() + 1).toString()
      console.log('dateFilter value', value)
    }
  }

  // console.log(response.events)
  //
  // $scope.events = response.events;
  //
  // $scope.location = response.location;


  // mainSrvc.searchEvents("dallas").then(function(response) {
  //   console.log(response);``
  //   $scope.events = response;
  //
  // })

  $scope.updateUser = (user) => {

    mainSrvc.updateUser(user).then(response => {
      console.log(response)
      $scope.updatedUser = response;
    });
  }

  $scope.addEventList = function(event) {
    mainSrvc.eventList.unshift(event)
    console.log(mainSrvc.eventList)
  }

  $scope.events = response.events;
  console.log($scope.events);



  mainSrvc.showEvent(user.authid).then(result => {
    console.log("post to events",result);
    $scope.myEvents = result;
    $scope.allMyEvents = result;
    return result;
  }).catch(err => console.log(err));





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








  $scope.location = response.location;




///////////////////////////////////////////////////////////////////////////

$scope.savedEventSubmit  = (event) => {
  const newEventSaved = { title: event.name.text,location:"Dallas, Texas",start:event.start.local,description:event.description.text,authid: user.authid,image:event.logo.original.url,ends:event.end.local};
  mainSrvc.savedEventSubmit (newEventSaved);
  console.log(newEventSaved);


}
})
