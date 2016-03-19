'use strict';

angular.module('capvmtApp.auth', [
  'capvmtApp.constants',
  'capvmtApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
