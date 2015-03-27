'use strict';

module.exports = function(app) {
  app.controller('homeController', ['$scope', '$rootScope',
    function($scope, $rootScope) {

    $rootScope.bodyclass = 'overflow';

    $rootScope.awayHome = function() {
      $rootScope.bodyclass = '';
    }

    $rootScope.toHome = function() {
      $rootScope.bodyclass = 'overflow';
    }

  }]);
};
