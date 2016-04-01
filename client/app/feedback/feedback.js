'use strict';

angular.module('capvmtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('feedback', {
        url: '/feedback',
        template: '<feedback></feedback>'
      });
  });
