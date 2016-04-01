'use strict';

angular.module('capvmtApp')
  .service('modelruns', function ($http) {
    var urlBase = '/api/modelruns';
        
    this.getModelRuns = function () {
            return $http.get(urlBase + '/');
        };
  });
