'use strict';

module.exports = function(app) {
  app.controller('feedController', ['$scope', '$cookies', '$location', '$http', '$interval', function($scope, $cookies, $location, $http, $interval) {

    if (!$cookies.eat || $cookies.eat.length < 1 ) {
      $location.path('/signin');
    }

    $scope.items = [];
    $scope.showcase = [];

    function getAll() {
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
    }

    function showDisplay() {
      // $http.defaults.headers.common['eat'] = $cookies.eat;
      var interval;
      function displayItem(element, index){
        if(element.time < document.getElementById("mainmovie").currentTime) {
          console.log(document.getElementById("mainmovie").currentTime);
          $scope.showcase.push(element);
          $scope.items.splice(index, 1);
        }
      }

      function displayStuff() {
        $scope.items.forEach(displayItem);
        console.log($scope.showcase);
        console.log(document.getElementById("mainmovie").currentTime);
      }

      function itemsDisplay() {
        interval = $interval(displayStuff, 500);
      }

      document.getElementById("mainmovie").addEventListener('playing', itemsDisplay);
      document.getElementById("mainmovie").addEventListener('pause', function() {
        interval = $interval.cancel(interval);
      });
    }

    $scope.workMagic = function() {
      getAll();
      showDisplay();
    };

    $scope.newLike = function(like) {
      $http.defaults.headers.common['eat'] = $cookies.eat;
      $http({
        method: 'PUT',
        url: 'api/v1/like_item/' + like.name,
        data: {
          name: $cookies.username
        }
      })
      .success(function() {
        $scope.showcase.splice($scope.showcase.indexOf(like), 1);
      })
      .error(function(data) {
        console.log(data);
      });

    };


    $scope.dislike = function(like) {
      $scope.showcase.splice($scope.showcase.indexOf(like), 1);
    };
  }]);

};

