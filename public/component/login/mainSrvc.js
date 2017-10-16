angular.module('xposure').service('mainSrvc', function($http) {
  // you can use this function for every request to get user.
  // don't write new versions of this in every service, keep it DRY


  this.getUser = () => $http.get('/auth/me');

  this.currentUser = {};

  this.getEvents = () => $http.get('https://www.eventbriteapi.com/v3/events/search/?location.address=dallas,tx&location.within=50mi&sort_by=best&token=VS4PG47YHJGSWEJUEE3Y')
    .then(response => {
      console.log(response.data.events);
      return response.data.events;
    });

  this.createUser = (user) => {
    console.log(user)

    return $http.post('/api/users/create', user);
  }

  this.searchEvents = (city) =>

    $http.get(`https://www.eventbriteapi.com/v3/events/search/?location.address=${city}&location.within=50mi&sort_by=best&token=VS4PG47YHJGSWEJUEE3Y`)
    .then(response => {

      return response.data;
    })

  this.updateUser = (user) => {

    return $http.put('/api/users', user);
  }


  this.showEvent = (authid) => {
    console.log(authid);
    return $http.get('/api/event/create/' + authid).then(function(response) {

      return response.data;
    });
  }




  this.eventList = [];


  this.eventSubmit = (newEvent) => {
    console.log(newEvent)
    return $http.post('/api/event/create', newEvent);
  }

  this.deleteEvent = (id) => {
    console.log(id)
    return $http.delete('/api/event/create/' +id).then(function(response) {
      console.log(response)
      return response;
    });
  }
////////////////////////////savedEvents//////////////////////////////////////////////

this.savedEventSubmit = (newEventSaved) => {
  console.log(newEventSaved)
  return $http.post('/api/savedevent/create', newEventSaved);
}

this.showSavedEvent = (authid) => {
  console.log(authid);
  return $http.get('/api/savedevent/create/' + authid).then(function(response) {
    console.log(response);
    return response.data;
  });
}

this.deleteSavedEvent = (id) => {
  console.log(id)
  return $http.delete('/api/savedevent/create/' +id).then(function(response) {
    console.log(response)
    return response;
  });
}

  ////////////////////////////////firebase////////////////////////////////
  this.profilePicSubmit = (first, last, email, file, userInfo) => {
    // console.log(firstname, lastname, email, file, userInfo ,userInfo,"from mainsrvc before image upload")
    console.log(first, last, email, file, userInfo, "from the service")
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
      console.log(userInfo, "from mainSrvc")
      const downloadURL = uploadTask.snapshot.downloadURL;
      let userId = userInfo.authid
      console.log(userId)
      // console.log(first,last,email,file,userInfo.authid, "from service after image upload")
      let uploadParams = {
        userId,
        downloadURL
      }
      console.log(uploadParams)
      return $http.post('/api/usersImage', uploadParams);
    });
  }









});
