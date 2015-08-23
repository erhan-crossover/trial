(function (app) {

  'use strict';

  app
    .directive('list', ['$timeout', function ($timeout) {
      return {
        restrict: 'EA',
        controller: function($scope) {
          var self = this;
          $scope.$watch('items', function(items) {
            $timeout(function() {
              self.items = items;
            });
          });
        },
        controllerAs: 'taskList',
        scope: {
          items: '='
        },
        templateUrl: 'features/list/list.html'
      }
    }]);

})(crossover);