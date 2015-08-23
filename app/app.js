(function (global) {

  'use strict';

  var crossover = angular.module('crossover', [
    'ngRoute'
  ]);

  crossover
    .config(['$routeProvider', function ($routeProvider) {

      $routeProvider.otherwise({redirectTo: '/'});

    }]);

  global.crossover = crossover;

})(window);