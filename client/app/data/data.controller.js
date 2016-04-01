'use strict';
(function(){

class DataComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('capvmtApp')
  .component('data', {
    templateUrl: 'app/data/data.html',
    controller: DataComponent
  });

})();
