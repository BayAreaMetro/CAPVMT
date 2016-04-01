'use strict';
(function(){

class FeedbackComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('capvmtApp')
  .component('feedback', {
    templateUrl: 'app/feedback/feedback.html',
    controller: FeedbackComponent
  });

})();
