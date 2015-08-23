(function (global) {

  'use strict';

  var crossover = angular.module('crossover', [
    'ngRoute'
  ]);

  crossover
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

      $locationProvider
        .html5Mode(false)
        .hashPrefix('!');

      $routeProvider
        .when('/', {
          templateUrl: 'features/home/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'home'
        });

      $routeProvider.otherwise({
        redirectTo: '/'
      });

    }]);

  global.crossover = crossover;

})(window);