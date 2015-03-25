'use strict';

module.exports = function(app) {
  app.controller('profileController', ['$scope', '$http', 
    function($scope, $http) {

    $scope.allLikes = [];

    $scope.getLikes = function(name) {
      $http({
        method: 'GET',
        url: '/api/v1/get_likes/';
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
