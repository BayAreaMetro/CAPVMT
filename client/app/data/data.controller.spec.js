'use strict';

describe('Component: DataComponent', function () {

  // load the controller's module
  beforeEach(module('capvmtApp'));

  var DataCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DataCtrl = $controller('DataCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
