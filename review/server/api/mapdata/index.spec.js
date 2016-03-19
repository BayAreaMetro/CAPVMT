'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var mapdataCtrlStub = {
  index: 'mapdataCtrl.index',
  show: 'mapdataCtrl.show',
  create: 'mapdataCtrl.create',
  update: 'mapdataCtrl.update',
  destroy: 'mapdataCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var mapdataIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './mapdata.controller': mapdataCtrlStub
});

describe('Mapdata API Router:', function() {

  it('should return an express router instance', function() {
    mapdataIndex.should.equal(routerStub);
  });

  describe('GET /api/mapdata', function() {

    it('should route to mapdata.controller.index', function() {
      routerStub.get
        .withArgs('/', 'mapdataCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/mapdata/:id', function() {

    it('should route to mapdata.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'mapdataCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/mapdata', function() {

    it('should route to mapdata.controller.create', function() {
      routerStub.post
        .withArgs('/', 'mapdataCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/mapdata/:id', function() {

    it('should route to mapdata.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'mapdataCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/mapdata/:id', function() {

    it('should route to mapdata.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'mapdataCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/mapdata/:id', function() {

    it('should route to mapdata.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'mapdataCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
