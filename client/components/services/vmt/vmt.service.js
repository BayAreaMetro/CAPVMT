'use strict';

angular.module('capvmtApp')
  .service('vmt', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
     var urlBase = '/api/vmt';
        

        this.getVMTdata = function (id, mr) {
            return $http.get(urlBase + '/' + id + '/' + mr);
        };
        
  });
