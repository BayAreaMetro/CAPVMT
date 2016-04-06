'use strict';

angular.module('capvmtApp')
  .service('places', function ($http) {
    var urlBase = '/api/places';
    var place = [{
                    id: 1
                }];


        this.getPlaces = function () {
            return $http.get(urlBase);
        };
	   this.getPlaceValue = function () {
                return place;
            };
       this.setPlaceValue = function(value) {
                place = [];
            	place = value;
            };

        
  });
