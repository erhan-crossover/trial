(function (app) {

  'use strict';

  app
    .directive('listItem', [function () {
      return {
        restrict: 'A',
        require: 'list',
        controller: function($scope) {
          this.data = $scope.data;
        },
        controllerAs: 'taskItem',
        scope: {
          data: '='
        },
        templateUrl: 'features/list-item/list-item.html'
      }
    }]);

})(crossover);