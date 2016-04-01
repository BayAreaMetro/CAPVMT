'use strict';

describe('Service: places', function () {

  // load the service's module
  beforeEach(module('capvmtApp'));

  // instantiate service
  var places;
  beforeEach(inject(function (_places_) {
    places = _places_;
  }));

  it('should do something', function () {
    expect(!!places).toBe(true);
  });

});
