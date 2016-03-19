'use strict';

var app = require('../..');
import request from 'supertest';

var newGh;

describe('Gh API:', function() {

  describe('GET /api/gh', function() {
    var ghs;

    beforeEach(function(done) {
      request(app)
        .get('/api/gh')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ghs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      ghs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/gh', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/gh')
        .send({
          name: 'New Gh',
          info: 'This is the brand new gh!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newGh = res.body;
          done();
        });
    });

    it('should respond with the newly created gh', function() {
      newGh.name.should.equal('New Gh');
      newGh.info.should.equal('This is the brand new gh!!!');
    });

  });

  describe('GET /api/gh/:id', function() {
    var gh;

    beforeEach(function(done) {
      request(app)
        .get('/api/gh/' + newGh._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          gh = res.body;
          done();
        });
    });

    afterEach(function() {
      gh = {};
    });

    it('should respond with the requested gh', function() {
      gh.name.should.equal('New Gh');
      gh.info.should.equal('This is the brand new gh!!!');
    });

  });

  describe('PUT /api/gh/:id', function() {
    var updatedGh;

    beforeEach(function(done) {
      request(app)
        .put('/api/gh/' + newGh._id)
        .send({
          name: 'Updated Gh',
          info: 'This is the updated gh!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedGh = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGh = {};
    });

    it('should respond with the updated gh', function() {
      updatedGh.name.should.equal('Updated Gh');
      updatedGh.info.should.equal('This is the updated gh!!!');
    });

  });

  describe('DELETE /api/gh/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/gh/' + newGh._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when gh does not exist', function(done) {
      request(app)
        .delete('/api/gh/' + newGh._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
