'use strict';
(function(){

class ExplorerComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('capvmtApp')
  .component('explorer', {
    templateUrl: 'app/explorer/explorer.html',
    controller: ExplorerComponent
  });

})();
