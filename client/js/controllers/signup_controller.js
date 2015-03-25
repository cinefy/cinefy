'use strict';

module.exports = function(app) {
  app.controller('signupinController', ['$scope', '$cookies', '$location', '$http', function($scope, $cookies, $location, $http) {

    if($cookies.eat || $cookies.eat.length > 0) {
      $location.path('/profile');
    }

    $scope.signUp = function() {
      $http.post('/api/v1/create_user', {
        {name: data-ng-model-signup, password: data-ng-model-password}
      })
      .success(function() {
        $location.path('/profile');
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.signIn = function() {
      $http({
        method: 'GET',
        url: 'api/v1/sign_in'
      })
      .success(function() {
        $location.path('/profile');
      })
      .error(function(data) {
        console.log(data);
      });x
    };

  }])
}
