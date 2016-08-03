'use strict';

describe('Filter: thousandSuffix', function () {

  // load the filter's module
  beforeEach(module('capvmtApp.thousandSuffix.filter'));

  // initialize a new instance of the filter before each test
  var thousandSuffix;
  beforeEach(inject(function ($filter) {
    thousandSuffix = $filter('thousandSuffix');
  }));

  it('should return the input prefixed with "thousandSuffix filter:"', function () {
    var text = 'angularjs';
    expect(thousandSuffix(text)).toBe('thousandSuffix filter: ' + text);
  });

});
