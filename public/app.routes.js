angular.module('xposure').config(($urlRouterProvider, $stateProvider) => {

  $urlRouterProvider.otherwise('/');

  // in the resolve, request the user, if no user, catcth the error (401, 404, etc.);
  // the user method gives access to a user prop in the homeCtrl
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './component/searchEvent/searchEventTmpl.html',
      controller: 'homeCtrl',
      resolve: {
        user: mainSrvc => {
          return mainSrvc.getUser()
          .then(response => response.data)
          .catch(err => err)
        },
        response: function(mainSrvc, $stateParams) {
          return mainSrvc.searchEvents("dallas");
      }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: './component/login/loginTmpl.html',
      controller: 'mainCtrl'
    })
    .state('searchEvent', {
      url: '/searchEvent/:city',
      templateUrl: './component/searchEvent/searchEventTmpl.html',
      controller: 'searchEventCtrl',
      resolve: {
        user: mainSrvc => {
          return mainSrvc.getUser()
          .then(response => response.data)
          .catch(err => err)
        },
        response: function(mainSrvc, $stateParams) {
          return mainSrvc.searchEvents($stateParams.city);
        }
      }
    })
    .state('profile', {
      url: '/profile',
      templateUrl: './component/profile/profileTmpl.html',
      controller: 'profileCtrl',
      resolve: {
        user: mainSrvc => mainSrvc.getUser()
          .then(response => response.data)
          .catch(err => err)
      }
    })
    .state('event', {
      url: '/event',
      templateUrl: './component/event/eventTmpl.html',
      controller: 'eventCtrl',
      resolve: {
        user: mainSrvc => mainSrvc.getUser()
          .then(response => response.data)
          .catch(err => err)
      }

    })
});
