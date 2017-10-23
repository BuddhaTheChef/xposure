angular.module('xposure').service('mainSrvc', function($http) {
  // you can use this function for every request to get user.
  // don't write new versions of this in every service, keep it DRY


  this.getUser = () => $http.get('/auth/me');

  this.forgetUser = () => $http.get('/auth/logout');

  this.currentUser = {};

  this.getEvents = () => $http.get('https://www.eventbriteapi.com/v3/events/search/?location.address=dallas,tx&location.within=20mi&sort_by=best&token=VS4PG47YHJGSWEJUEE3Y')
    .then(response => {
      console.log(response.data);
      return response.data.events;
    });


// let today = moment(today);
//
// let tomorrow = moment(today).add(1, 'days');
// let startOfNextWeek = moment(today).add(1, 'weeks').startOf('isoWeek');
// let endOfWeekAfter = moment().add(1, 'weeks').endOf('isoWeek');


this.showTodayEvents = (events, myEvents) => {
  let today = new Date()
  today = today.toISOString()
  let end = new Date()
  end.setHours(23,59,59,999)
  end = end.toISOString()
  let eventsArr = []
  _.mapObject(events , x => {
    let eventDate = x.start ? x.start.local : x.starts
    if(moment(eventDate).isBetween(today, end)){
      eventsArr.push(x)
    }
  })

return eventsArr
  // console.log(start, end, events)
}

this.showTomorrowEvents = (events) => {
  console.log(events)
  let today = new Date()
  let tomorrow = moment(today).add(1, 'days').startOf('day');
  let endOfTomorrow = moment(today).add(1, 'days').endOf('day');
  let eventsArr = []

  _.mapObject(events, x => {
    let eventDate = x.start ? x.start.local : x.starts
    if(moment(eventDate).isBetween(tomorrow, endOfTomorrow))
    eventsArr.push(x)
  })

  return eventsArr
}


this.showThisWeekEvents = (events) => {
  console.log("this week", events)
  let today = new Date()
  let startOfThistWeek = moment(today).startOf('isoWeek');
  let endOfThisWeek = moment(today).endOf('isoWeek');
  let eventsArr = []

  _.mapObject(events, x => {
    let eventDate = x.start ? x.start.local : x.starts
    if(moment(eventDate).isBetween(startOfThistWeek, endOfThisWeek))
    eventsArr.push(x)
  })
  // _.mapObject(myEvents, x => {
  //   let eventDate = x.starts;
  //   console.log(moment(eventDate));
  //   if(moment(eventDate).isBetween(startOfThistWeek, endOfThisWeek))
  //   eventsArr.push(x)
  // })

  return eventsArr
}


this.showNextWeekEvents = (events) => {
  console.log(events)
  let today = new Date()
  let startOfNextWeek = moment(today).add(1, 'weeks').startOf('isoWeek');
  let endOfNextWeek = moment(today).add(1, 'weeks').endOf('isoWeek');
  let eventsArr = []

  _.mapObject(events, x => {
    let eventDate = x.start ? x.start.local : x.starts
    if(moment(eventDate).isBetween(startOfNextWeek, endOfNextWeek))
    eventsArr.push(x)
  })

  return eventsArr
}



this.showThisMonthEvents = (events) => {
  console.log(events)
  let today = new Date()
  let startOfThisMonth = moment(today).startOf('months');
  let endOfThisMonth = moment().endOf('months');
  let eventsArr = []

  _.mapObject(events, x => {
    let eventDate = x.start ? x.start.local : x.starts
    if(moment(eventDate).isBetween(startOfThisMonth, endOfThisMonth))
    eventsArr.push(x)
  })

  return eventsArr
}

this.showNextMonthEvents = (events) => {
  console.log(events)
  let today = new Date()
  let startOfNextMonth = moment(today).add(1, 'months').startOf('months');
  let endOfNextMonth = moment(today).add(1, 'months').endOf('months');
  let eventsArr = []

  _.mapObject(events, x => {
    let eventDate = x.start ? x.start.local : x.starts
    if(moment(eventDate).isBetween(startOfNextMonth, endOfNextMonth))
    eventsArr.push(x)
  })

  return eventsArr
}




// this.showWeekAfterEvents = (events, myEvents) => {
//   let today = new Date()
//   let startOfWeekAfter = moment(today).add(2, 'weeks').startOf('isoWeek');
//   let endOfWeekAfter = moment().add(2, 'weeks').endOf('isoWeek');
//   let eventsArr = []
//
//   _.mapObject(events, x => {
//     let eventDate = x.start.local
//     if(moment(eventDate).isBetween(startOfWeekAfter, endOfWeekAfter))
//     eventsArr.push(x)
//   })
//
//   return eventsArr
// }









 this.categories = {
     103: "Music", 101: "Business & Professional", 110: "Food & Drink", 113: "Community & Culture", 105: "Performing & Visual Arts",
     104: "Film, Media & Entertainment", 108: "Sports & Fitness", 107: "Health & Wellness", 102: "Science & Technology", 109: "Travel & Outdoor",
     111: "Charity & Causes", 114: "Religion & Spirituality", 115: "Family & Education", 116: "Seasonal & Holiday", 112: "Government & Politics",
     106: "Fashion & Beauty", 117: "Home & Lifestyle", 118: "Auto, Boat & Air", 119: "Hobbies & Special Interest", 199: "Other", 120: "School Activities"
   };







  this.createUser = (user) => {
    console.log(user)

    return $http.post('/api/users/create', user);
  }

  this.searchEvents = (city) =>

    $http.get(`https://www.eventbriteapi.com/v3/events/search/?location.address=${city}&location.within=100mi&sort_by=best&token=VS4PG47YHJGSWEJUEE3Y`)
    .then(response => {
      console.log(response.data)
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
