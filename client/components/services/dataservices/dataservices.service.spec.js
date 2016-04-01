'use strict';

describe('Service: dataservices', function () {

  // load the service's module
  beforeEach(module('capvmtApp'));

  // instantiate service
  var dataservices;
  beforeEach(inject(function (_dataservices_) {
    dataservices = _dataservices_;
  }));

  it('should do something', function () {
    expect(!!dataservices).toBe(true);
  });

});
