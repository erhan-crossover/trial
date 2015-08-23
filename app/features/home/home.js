(function (app) {

  'use strict';

  app
    .controller('HomeCtrl', ['DataService', '$timeout', '$scope', function (DataService, $timeout, $scope) {
      var self = this;

      this.taskResults = [];

      this.getTaskResults = function(pagerInfo) {
        DataService
          .getItems(pagerInfo)
          .then(
            function(result) {
              $timeout(function() {
                self.taskResults = result;
              });
            },
            function(error) {
              console.error(error);
            });
      };

      this.getTaskResults();

    }]);

})(crossover);