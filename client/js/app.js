'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-utf8-base64');

var cinefyApp = angular.module('cinefyApp', ['ngRoute', require('angular-cookies'), 'utf8-base64']);

require('./lib/users')(cinefyApp);
require('./controllers/feed_controller')(cinefyApp);
require('./controllers/profile_controller')(cinefyApp);
require('./controllers/signup_controller')(cinefyApp);
require('./controllers/home_controller')(cinefyApp);


cinefyApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'templates/home.html',
    controller: 'homeController'
  })
  .when('/profile', {
    templateUrl: 'templates/myprofile.html',
    controller: 'profileController'
  })
  .when('/signin', {
    templateUrl: 'templates/signin.html',
    controller: 'signupinController'
  })
  .when('/play', {
    templateUrl: 'templates/demo.html',
    controller: 'feedController'
  });
}]);
