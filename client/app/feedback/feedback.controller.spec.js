'use strict';

describe('Component: FeedbackComponent', function () {

  // load the controller's module
  beforeEach(module('capvmtApp'));

  var FeedbackComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    FeedbackComponent = $componentController('FeedbackComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
