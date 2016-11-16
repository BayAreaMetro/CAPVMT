'use strict';
(function() {

    class FeedbackComponent {
        constructor($http, $scope) {
            this.message = 'Hello';
            $scope.submitFeedbackSuccess = false;
            $scope.submitFeedbackFail = false;
            $scope.submitFeedback = function() {
                $http.post('api/feedback', $scope.feedback)
                    .success(function(response) {
                        console.log(response);
                        if (response.status === 'success') {
                            $scope.submitFeedbackSuccess = true;
                            $scope.submitFeedbackFail = false;
                        }
                    }).error(function(err) {
                        if (err) {
                            $scope.submitFeedbackFail = true;
                            $scope.submitFeedbackSuccess = false;
                        }
                    });
            };
        }
    }

    angular.module('capvmtApp')
        .component('feedback', {
            templateUrl: 'app/feedback/feedback.html',
            controller: FeedbackComponent
        });

})();
