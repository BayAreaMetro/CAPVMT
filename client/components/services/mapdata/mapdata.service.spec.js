'use strict';

describe('Service: mapdata', function () {

  // load the service's module
  beforeEach(module('capvmtApp'));

  // instantiate service
  var mapdata;
  beforeEach(inject(function (_mapdata_) {
    mapdata = _mapdata_;
  }));

  it('should do something', function () {
    expect(!!mapdata).toBe(true);
  });

});
