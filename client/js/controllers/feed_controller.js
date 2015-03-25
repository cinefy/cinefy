'use strict';

module.exports = function(app) {
  app.controller('feedController', ['$scope', '$cookies', '$location', '$http', function($scope, $cookies, $location, $http) {

    if (!$cookies.eat || $cookies.eat.length < 1) {
      $location.path('/signup');
    }

    $scope.items = [];
    $scope.displayed = [];

    $scope.getAll = function() {
      $http.defaults.headers.common['eat'] = $cookies.eat;
      $http({
        method: 'GET',
        url: 'api/v1/item'
      })
      .success(function(data) {
        $scope.items = data;
      })
      .error(function(data) {
        console.log(data);
      });

    };

    $scope.showDisplay = function() {
      function displayItem(element, index){
        if(element.time < document.getElementById("mainmovie").currentTime) {
        $scope.displayed.push(element);
        $scope.items.splice(index, 1);
        }
      }
      $scope.apply($scope.items.forEach(displayItem));
    };

    $scope.newLike = function(like) {
      $http.defaults.headers.common['eat'] = $cookies.eat;
      $http({
        method: 'POST',
        url: 'api/v1/like_item',
        name: $cookies.name
      })
      .success(function() {
        $scope.displayed.splice($scope.displayed.indexOf(like), 1);
      })
      .error(function(data) {
        console.log(data);
      });

    };


    $scope.dislike = function(like) {
      $scope.displayed.splice($scope.displayed.indexOf(like), 1);
    };
  }]);

};

