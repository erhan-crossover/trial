(function (app) {

  'use strict';

  app
    .directive('listBox', [function () {
      return {
        restrict: 'A',
        require: 'listItem',
        controller: function($scope) {
          this.data = $scope.data;
        },
        controllerAs: 'taskBox',
        scope: {
          data: '='
        },
        templateUrl: 'features/list-box/list-box.html'
      }
    }]);

})(crossover);