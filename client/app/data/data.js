'use strict';

angular.module('capvmtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('data', {
        url: '/data',
        template: '<data></data>'
      });
  });
