'use strict';

describe('Service: modelruns', function () {

  // load the service's module
  beforeEach(module('capvmtApp'));

  // instantiate service
  var modelruns;
  beforeEach(inject(function (_modelruns_) {
    modelruns = _modelruns_;
  }));

  it('should do something', function () {
    expect(!!modelruns).toBe(true);
  });

});
