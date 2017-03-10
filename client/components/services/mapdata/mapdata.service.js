'use strict';

angular.module('capvmtApp')
    .service('mapdata', function($http) {
        var urlBase = '/api/mapdata';


        this.getVMTplace = function(id) {
            return $http.get(urlBase + '/vmtplace/' + id);
        };
        this.getVMTtaz = function(id, isCounty) {
            return $http.get(urlBase + '/vmttaz/' + id + '/' + isCounty);
        };
        this.getVMTurbantaz = function(id, isCounty) {
            return $http.get(urlBase + '/vmturbantaz/' + id + '/' + isCounty);
        };
    });