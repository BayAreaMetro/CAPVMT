'use strict';

describe('Component: DataComponent', function () {

  // load the controller's module
  beforeEach(module('capvmtApp'));

  var DataComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    DataComponent = $componentController('DataComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
