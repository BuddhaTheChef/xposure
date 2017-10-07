angular.module('xposure').service('mainSrvc', function($http) {
    // you can use this function for every request to get user.
    // don't write new versions of this in every service, keep it DRY
    this.getUser = () => $http.get('/auth/me');

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




  ////////////////////////////////firebase////////////////////////////////


  //
  // // Upload file and metadata to the object 'images/mountains.jpg'
  // this.uploadImage = storageRef.child('images/' + file.name).put(file, metadata);
  //
  // // Listen for state changes, errors, and completion of the upload.
  // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  //   function(snapshot) {
  //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log('Upload is ' + progress + '% done');
  //     switch (snapshot.state) {
  //       case firebase.storage.TaskState.PAUSED: // or 'paused'
  //         console.log('Upload is paused');
  //         break;
  //       case firebase.storage.TaskState.RUNNING: // or 'running'
  //         console.log('Upload is running');
  //         break;
  //     }
  //   }, function(error) {
  //
  //   // A full list of error codes is available at
  //   // https://firebase.google.com/docs/storage/web/handle-errors
  //   switch (error.code) {
  //     case 'storage/unauthorized':
  //       // User doesn't have permission to access the object
  //       break;
  //
  //     case 'storage/canceled':
  //       // User canceled the upload
  //       break;
  //
  //     ...
  //
  //     case 'storage/unknown':
  //       // Unknown error occurred, inspect error.serverResponse
  //       break;
  //   }
  // }, function() {
  //   // Upload completed successfully, now we can get the download URL
  //   var downloadURL = uploadTask.snapshot.downloadURL;
  // });















});
