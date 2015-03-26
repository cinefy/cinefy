'use strict';

require('angular/angular');
require('angular-route');

var cinefyApp = angular.module('cinefyApp', ['ngRoute']);

require('./controllers/feed_controller')(cinefyApp);
require('./controllers/profile_controller')(cinefyApp);
require('./controllers/signup_controller')(cinefyApp);

cinefyApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'templates/home.html'
  })
  .when('/profile', {
    templateUrl: 'templates/myprofile.html'
  })
  .when('/signin', {
    templateUrl: 'templates/signin.html',
    controller: 'signupinController'
  })
}]);
