angular.module('xposure').controller('homeCtrl', function($scope, user, mainSrvc,response) {
  // user comes from resolve, will either be the user obj or error message we send from server
  console.log(user);
  // if user.data and user.data.err then user = err
  // else user = user object from database



  $scope.user = user.data && user.data.err ? user.data.err : user;


  // console.log(response.events)
  //
  // $scope.events = response.events;
  //
  // $scope.location = response.location;


  // mainSrvc.searchEvents("dallas").then(function(response) {
  //   console.log(response);
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

  $scope.location = response.location;

///////////////////////////////////////////////////////////////////////////

$scope.savedEventSubmit  = (event) => {
  const newEventSaved = { title: event.name.text,location:"Dallas, Texas",start:event.start.local,description:event.description.text,authid: user.authid,image:event.logo.original.url,ends:event.end.local};
  mainSrvc.savedEventSubmit (newEventSaved);
  console.log(newEventSaved);


}
  ///////////////////////////test///////////////////////////////////////////

  // const getUserByName =  (req,res,next)=>{
  //   const db = req.app.get('db');
  //   db.getUserByName([req.query.name]).then(answer => {
  //     res.json(answer);
  //   });
  // }
  //
  // module.exports = {
  //   getUserByName
  // }

  ////////////////////////////////////////////////////////////////////////////


})
