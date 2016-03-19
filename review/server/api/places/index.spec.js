'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var placesCtrlStub = {
  index: 'placesCtrl.index',
  show: 'placesCtrl.show',
  create: 'placesCtrl.create',
  update: 'placesCtrl.update',
  destroy: 'placesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var placesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './places.controller': placesCtrlStub
});

describe('Places API Router:', function() {

  it('should return an express router instance', function() {
    placesIndex.should.equal(routerStub);
  });

  describe('GET /api/places', function() {

    it('should route to places.controller.index', function() {
      routerStub.get
        .withArgs('/', 'placesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/places/:id', function() {

    it('should route to places.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'placesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/places', function() {

    it('should route to places.controller.create', function() {
      routerStub.post
        .withArgs('/', 'placesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/places/:id', function() {

    it('should route to places.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'placesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/places/:id', function() {

    it('should route to places.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'placesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/places/:id', function() {

    it('should route to places.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'placesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
