'use strict';

describe('Component: AboutComponent', function () {

  // load the controller's module
  beforeEach(module('capvmtApp'));

  var AboutComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    AboutComponent = $componentController('AboutComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
