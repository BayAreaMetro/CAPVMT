'use strict';
(function() {

    class AboutComponent {
        constructor($scope) {
            this.message = 'Hello';
            $scope.status = {
                isCustomHeaderOpen: false,
                isFirstOpen: true,
                isFirstDisabled: false
            };

        }
    }

    angular.module('capvmtApp')
        .component('about', {
            templateUrl: 'app/about/about.html',
            controller: AboutComponent
        });

})();