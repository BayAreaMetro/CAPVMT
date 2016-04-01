'use strict';

angular.module('capvmtApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('explorer', {
        url: '/explorer',
        templateUrl: 'app/explorer/explorer.html',
        controller:'ExplorerCtrl'
      });
  });
