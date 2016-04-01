'use strict';

angular.module('capvmtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('explorer', {
        url: '/explorer',
        template: '<explorer></explorer>'
      });
  });
