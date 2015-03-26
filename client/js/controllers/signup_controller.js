'use strict';

module.exports = function(app) {
  app.controller('signupinController', ['$scope', '$cookies', '$location', '$http', 'base64', function($scope, $cookies, $location, $http, base64) {


    if($cookies.eat) {
      $location.path('/profile');
    }

    $scope.showLogin = function() {
      $scope.logintab = true;


    }

    $scope.showSignup = function() {
      $scope.logintab = false;
    }

    $scope.signUp = function() {
      $http({
        method: 'POST',
        url: '/api/v1/create_user',
        data: {name: $scope.signup.username, password: $scope.signup.password}
      })
      .success(function(data) {
        console.log('user successfully created');
        $cookies.eat = data.eat;
        $cookies.username = data.name;
        $location.path('/profile');
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.signIn = function() {
      $http.defaults.headers.common['Authorization'] = 'Basic: ' + base64.encode($scope.login.username + ':' + $scope.login.password);
      $http.get('/api/v1/sign_in')
      .success(function(data) {
        console.log('logged in');
        $cookies.eat = data.eat;
        $cookies.username = data.name;
        $location.path('/profile');
      })
      .error(function(data) {
        console.log(data);
      });
    };

  }])
}
