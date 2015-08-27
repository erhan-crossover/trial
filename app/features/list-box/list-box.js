(function (app) {

  'use strict';

  app
    .directive('listBox', ['$timeout', function ($timeout) {
      return {
        restrict: 'A',
        require: 'listItem',
        controller: function($scope) {
          var self = this;
          this.data = $scope.data;

          $timeout(function() {
            renderChart('unit');
            renderChart('func');
          });


          this.getFailedTask = function() {
            if (self.data.metrics.state === 'rejected') {
              return 'Metrics';
            } else if (self.data.build.state === 'rejected') {
              return 'Build';
            } else if (self.data.unitTest.state === 'rejected') {
              return 'Unit Tests';
            } else if (self.data.functionalTest.state === 'rejected') {
              return 'Functional Tests';
            }
          };

          function renderChart(chartType) {

            // we do not have chart data so return
            if (chartType === 'unit') {
              if (!self.data.unitTest) {
                return;
              }
              if (self.data.unitTest &&
                  self.data.unitTest.state === 'pending' ||
                  self.data.unitTest.state === 'running') {
                return;
              }
            }

            if (chartType === 'func') {
              if (!self.data.functionalTest) {
                return;
              }
              if (self.data.functionalTest.state === 'pending' ||
                  self.data.functionalTest.state === 'running') {
                return;
              }
            }

            var elementClass;
            var data = {
              series: []
            };

            var sum = function(a, b) { return a + b };

            if (chartType === 'unit') {
              data.series = [self.data.unitTest.count, self.data.unitTest.passed];
              elementClass = '.unit-test-chart';
            } else {
              data.series = [self.data.functionalTest.count, self.data.functionalTest.passed];
              elementClass = '.func-test-chart';
            }

            if (elementClass) {
              new Chartist.Pie(elementClass, data, {
                labelInterpolationFnc: function(value) {
                  return Math.round(value / data.series.reduce(sum) * 100) + '%';
                }
              });
            }
          }

          $scope.$watch('selected', function() {
            $timeout(function() {
              renderChart('unit');
              renderChart('func');
            });
          });

        },
        controllerAs: 'taskBox',
        scope: {
          data: '=',
          selected: '='
        },
        templateUrl: 'features/list-box/list-box.html'
      }
    }]);

})(crossover);