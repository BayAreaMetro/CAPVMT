'use strict';

angular.module('capvmtApp')
  .service('modelruns', function ($http) {
    var urlBase = '/api/modelruns';
    var mr = [{
                    mr: "2005_05_003"
                }];

    this.getModelRuns = function () {
            return $http.get(urlBase + '/');
        };

	   this.getModelRunValue = function () {
                return mr;
            };
       this.setModelRunValue = function(value) {
                mr = [];
            	mr = value;
            };
  });
