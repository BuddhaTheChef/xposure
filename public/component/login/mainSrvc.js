angular.module('xposure').service('mainSrvc', function($http) {
    // you can use this function for every request to get user.
    // don't write new versions of this in every service, keep it DRY
    this.getUser = () => $http.get('/auth/me');

    this.getEvents = () => $http.get('https://www.eventbriteapi.com/v3/events/search/?location.address=dallas,tx&location.within=50mi&sort_by=best&token=VS4PG47YHJGSWEJUEE3Y')
    .then(response =>{
      console.log(response.data.events);
      return response.data.events;
    });
    this.createUser = (user) => {
      console.log(user)

    return $http.post('/api/users/create', user);
    }

    this.searchEvents = (city) =>

      $http.get(`https://www.eventbriteapi.com/v3/events/search/?location.address=${city}&location.within=50mi&sort_by=best&token=VS4PG47YHJGSWEJUEE3Y`)
      .then( (response) => {
        console.log(response)
      })

    this.updateUser = (user) => {

    return $http.put('/api/users', user);
  }
});
