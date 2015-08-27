(function (app) {

  'use strict';

  app
    .directive('listItem', ['$timeout', function ($timeout) {
      return {
        restrict: 'A',
        require: 'list',
        transclue: true,
        controller: function($scope) {
          var self = this;
          this.data = $scope.data;
          this.itemIndex = $scope.itemIndex;
          this.selectedIndex = 0;

          this.expandDetails = function(selectedIndex) {
            var self = this;

            $('.detail').each(function() {
              $(this)
                .removeClass('detail')
                .find('.list-item-details')
                .hide();
            });

            $('#list-item-index-' + selectedIndex)
              .addClass('detail')
              .find('.list-item-details')
              .show();

            $timeout(function() {
              self.showDetails = !self.showDetails;
              self.selectedIndex = selectedIndex;
            });

          };
        },
        controllerAs: 'taskItem',
        scope: {
          data: '=',
          selectedIndex: '='
        },
        templateUrl: 'features/list-item/list-item.html'
      }
    }]);

})(crossover);