'use strict';

var app = require('../..');
import request from 'supertest';

var newVmt;

describe('Vmt API:', function() {

  describe('GET /api/vmt', function() {
    var vmts;

    beforeEach(function(done) {
      request(app)
        .get('/api/vmt')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          vmts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      vmts.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/vmt', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/vmt')
        .send({
          name: 'New Vmt',
          info: 'This is the brand new vmt!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newVmt = res.body;
          done();
        });
    });

    it('should respond with the newly created vmt', function() {
      newVmt.name.should.equal('New Vmt');
      newVmt.info.should.equal('This is the brand new vmt!!!');
    });

  });

  describe('GET /api/vmt/:id', function() {
    var vmt;

    beforeEach(function(done) {
      request(app)
        .get('/api/vmt/' + newVmt._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          vmt = res.body;
          done();
        });
    });

    afterEach(function() {
      vmt = {};
    });

    it('should respond with the requested vmt', function() {
      vmt.name.should.equal('New Vmt');
      vmt.info.should.equal('This is the brand new vmt!!!');
    });

  });

  describe('PUT /api/vmt/:id', function() {
    var updatedVmt;

    beforeEach(function(done) {
      request(app)
        .put('/api/vmt/' + newVmt._id)
        .send({
          name: 'Updated Vmt',
          info: 'This is the updated vmt!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedVmt = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVmt = {};
    });

    it('should respond with the updated vmt', function() {
      updatedVmt.name.should.equal('Updated Vmt');
      updatedVmt.info.should.equal('This is the updated vmt!!!');
    });

  });

  describe('DELETE /api/vmt/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/vmt/' + newVmt._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when vmt does not exist', function(done) {
      request(app)
        .delete('/api/vmt/' + newVmt._id)
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
