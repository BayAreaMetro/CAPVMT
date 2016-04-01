'use strict';

describe('Service: vmt', function () {

  // load the service's module
  beforeEach(module('capvmtApp'));

  // instantiate service
  var vmt;
  beforeEach(inject(function (_vmt_) {
    vmt = _vmt_;
  }));

  it('should do something', function () {
    expect(!!vmt).toBe(true);
  });

});
