'use strict';

angular.module('capvmtApp', [
  'capvmtApp.auth',
  'capvmtApp.admin',
  'capvmtApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'capvmt.filter.percentage',
  'capvmt.filter.thousandSuffix'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
