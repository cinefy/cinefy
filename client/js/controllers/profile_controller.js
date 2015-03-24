'use strict';

module.exports = function(app) {
  app.controller('profileController', ['$scope', '$http', 
    function($scope, $http) {

    $scope.get_likes = [];

    $scope.get = function(data) {
      $http({
        method: 'GET',
        url: '/api/v1/get_likes';
      })
      .success(function(data) {
        $scope.get_likes = data;
      })
      .error(function(data) {
        console.log(data);
      });
    }
  }]);
};
