'use strict';

module.exports = function(app) {
  app.run(['$rootScope', '$cookies', '$location', function($rootScope, $cookies, $location) {
    $rootScope.logOut = function() {
      return !$cookies.eat;
    };

    $rootScope.loggedIn = function() {
      return !!$cookies.eat;
    };

    $rootScope.signOut = function() {
      $cookies.eat = '';
      $location.path('/home');
    };

  }]);
  require('../controllers/signup_controller')(app);
};
