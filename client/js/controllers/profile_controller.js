'use strict';

module.exports = function(app) {
  app.controller('profileController', ['$scope', '$http', '$cookies', '$location', '$window',
    function($scope, $http, $cookies, $location, $window) {

    if(!$cookies.eat) {
      $location.path('/signin');
    }

    $scope.allLikes = [];

    $scope.getLikes = function() {
      console.log($cookies.eat);
      console.log($cookies.username);
      $http.defaults.headers.common['eat'] = $cookies.eat;
      $http({
        method: 'GET',
        url: '/api/v1/get_likes/' + $cookies.username
      })
      .success(function(data) {
        $scope.allLikes = data;
        console.log($scope.allLikes);
      })
      .error(function(data) {
        console.log(data);
      });
    }

    $scope.openLink = function(link) {
      $window.open(link);
    }
  }]);
};
