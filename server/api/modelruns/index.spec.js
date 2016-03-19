'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var modelrunsCtrlStub = {
  index: 'modelrunsCtrl.index',
  show: 'modelrunsCtrl.show',
  create: 'modelrunsCtrl.create',
  update: 'modelrunsCtrl.update',
  destroy: 'modelrunsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var modelrunsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './modelruns.controller': modelrunsCtrlStub
});

describe('Modelruns API Router:', function() {

  it('should return an express router instance', function() {
    modelrunsIndex.should.equal(routerStub);
  });

  describe('GET /api/modelruns', function() {

    it('should route to modelruns.controller.index', function() {
      routerStub.get
        .withArgs('/', 'modelrunsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/modelruns/:id', function() {

    it('should route to modelruns.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'modelrunsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/modelruns', function() {

    it('should route to modelruns.controller.create', function() {
      routerStub.post
        .withArgs('/', 'modelrunsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/modelruns/:id', function() {

    it('should route to modelruns.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'modelrunsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/modelruns/:id', function() {

    it('should route to modelruns.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'modelrunsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/modelruns/:id', function() {

    it('should route to modelruns.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'modelrunsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
