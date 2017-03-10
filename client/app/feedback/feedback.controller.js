'use strict';
(function() {

    class FeedbackComponent {
        constructor($http, $scope, $timeout) {
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

                            $timeout(dismissNotice, 3000);
                        }
                    }).error(function(err) {
                        if (err) {
                            $scope.submitFeedbackFail = true;
                            $scope.submitFeedbackSuccess = false;
                            $timeout(dismissNotice, 3000);
                        }
                    });
            };

            function dismissNotice() {
                $scope.submitFeedback = false;
                $scope.submitFeedbackFail = false;
            }
        }
    }

    angular.module('capvmtApp')
        .component('feedback', {
            templateUrl: 'app/feedback/feedback.html',
            controller: FeedbackComponent
        });

})();