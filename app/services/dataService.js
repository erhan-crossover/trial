(function (app) {

  'use strict';

  app
    .factory('DataService', ['$q', '$http', '$timeout',
      function ($q, $http, $timeout) {

        return {
          getItems: function (pagerInfo) {
            var defer = $q.defer();

            var requestAddress = 'http://localhost:8000/services/data.json';

            $http({
              url: requestAddress,
              method: 'GET'
            })
              .success(function (response) {
                if (response) {
                  defer.resolve(response);
                } else {
                  defer.resolve([]);
                }
              })
              .error(function (err) {
                defer.reject(err);
              });

            return defer.promise;
          }
        };
      }]);

})(crossover);