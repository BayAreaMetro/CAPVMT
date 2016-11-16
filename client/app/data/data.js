'use strict';

angular.module('capvmtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('data', {
        url: '/data',
        templateUrl: 'app/data/data.html',
        controller:'DataCtrl'
      });
  });
