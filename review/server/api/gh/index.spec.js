'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ghCtrlStub = {
  index: 'ghCtrl.index',
  show: 'ghCtrl.show',
  create: 'ghCtrl.create',
  update: 'ghCtrl.update',
  destroy: 'ghCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ghIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './gh.controller': ghCtrlStub
});

describe('Gh API Router:', function() {

  it('should return an express router instance', function() {
    ghIndex.should.equal(routerStub);
  });

  describe('GET /api/gh', function() {

    it('should route to gh.controller.index', function() {
      routerStub.get
        .withArgs('/', 'ghCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/gh/:id', function() {

    it('should route to gh.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'ghCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/gh', function() {

    it('should route to gh.controller.create', function() {
      routerStub.post
        .withArgs('/', 'ghCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/gh/:id', function() {

    it('should route to gh.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'ghCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/gh/:id', function() {

    it('should route to gh.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'ghCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/gh/:id', function() {

    it('should route to gh.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'ghCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
