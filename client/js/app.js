'use strict';

require('angular/angular');
require('angular-route');

var cinefyApp = angular.module('cinefyApp', ['ngRoute']);

require('./controllers/feed_controller')(cinefyApp);

cinefyApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'templates/demo.html',
    controller:'feedController'
  });
}]);