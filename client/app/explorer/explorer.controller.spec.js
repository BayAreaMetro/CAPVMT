'use strict';

describe('Component: ExplorerComponent', function () {

  // load the controller's module
  beforeEach(module('capvmtApp'));

  
  var ExplorerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExplorerCtrl = $controller('ExplorerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
