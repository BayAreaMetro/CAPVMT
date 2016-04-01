'use strict';

describe('Service: baseurl', function () {

  // load the service's module
  beforeEach(module('capvmtApp'));

  // instantiate service
  var baseurl;
  beforeEach(inject(function (_baseurl_) {
    baseurl = _baseurl_;
  }));

  it('should do something', function () {
    expect(!!baseurl).toBe(true);
  });

});
