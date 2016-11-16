'use strict';

angular.module('capvmt.filter.percentage', [])
    .filter('percentage', function($filter) {
        return function(input, decimals) {
            return $filter('number')(input * 100, decimals) + '%';
        };
    });
