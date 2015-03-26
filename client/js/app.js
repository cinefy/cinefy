'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-utf8-base64');

var cinefyApp = angular.module('cinefyApp', ['ngRoute', 'ngCookies', 'utf8-base64']);

require('./controllers/feed_controller')(cinefyApp);
require('./controllers/profile_controller')(cinefyApp);
require('./controllers/signup_controller')(cinefyApp);

cinefyApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'templates/home.html'
  })
  .when('/profile', {
    templateUrl: 'templates/myprofile.html',
    controller: 'profileController'
  })
  .when('/signin', {
    templateUrl: 'templates/signin.html',
    controller: 'signupinController'
  });
}]);
