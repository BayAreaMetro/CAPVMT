'use strict';

describe('Component: ExplorerComponent', function () {

  // load the controller's module
  beforeEach(module('capvmtApp'));

  var ExplorerComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ExplorerComponent = $componentController('ExplorerComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
