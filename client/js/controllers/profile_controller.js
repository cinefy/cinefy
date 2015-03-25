'use strict';

module.exports = function(app) {
  app.controller('profileController', ['$scope', '$http', '$cookies',
    function($scope, $http, $cookies) {

    $scope.allLikes = [];

    $scope.getLikes = function() {
      $http({
        method: 'GET',
        url: '/api/v1/get_likes/' + $cookies.name
      })
      .success(function(data) {
        $scope.allLikes = data;
      })
      .error(function(data) {
        console.log(data);
      });
    }
  }]);
};
