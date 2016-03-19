'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var vmtCtrlStub = {
  index: 'vmtCtrl.index',
  show: 'vmtCtrl.show',
  create: 'vmtCtrl.create',
  update: 'vmtCtrl.update',
  destroy: 'vmtCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var vmtIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './vmt.controller': vmtCtrlStub
});

describe('Vmt API Router:', function() {

  it('should return an express router instance', function() {
    vmtIndex.should.equal(routerStub);
  });

  describe('GET /api/vmt', function() {

    it('should route to vmt.controller.index', function() {
      routerStub.get
        .withArgs('/', 'vmtCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/vmt/:id', function() {

    it('should route to vmt.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'vmtCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/vmt', function() {

    it('should route to vmt.controller.create', function() {
      routerStub.post
        .withArgs('/', 'vmtCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/vmt/:id', function() {

    it('should route to vmt.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'vmtCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/vmt/:id', function() {

    it('should route to vmt.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'vmtCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/vmt/:id', function() {

    it('should route to vmt.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'vmtCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
