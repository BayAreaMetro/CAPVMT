'use strict';

var app = require('../..');
import request from 'supertest';

var newModelruns;

describe('Modelruns API:', function() {

  describe('GET /api/modelruns', function() {
    var modelrunss;

    beforeEach(function(done) {
      request(app)
        .get('/api/modelruns')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          modelrunss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      modelrunss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/modelruns', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/modelruns')
        .send({
          name: 'New Modelruns',
          info: 'This is the brand new modelruns!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newModelruns = res.body;
          done();
        });
    });

    it('should respond with the newly created modelruns', function() {
      newModelruns.name.should.equal('New Modelruns');
      newModelruns.info.should.equal('This is the brand new modelruns!!!');
    });

  });

  describe('GET /api/modelruns/:id', function() {
    var modelruns;

    beforeEach(function(done) {
      request(app)
        .get('/api/modelruns/' + newModelruns._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          modelruns = res.body;
          done();
        });
    });

    afterEach(function() {
      modelruns = {};
    });

    it('should respond with the requested modelruns', function() {
      modelruns.name.should.equal('New Modelruns');
      modelruns.info.should.equal('This is the brand new modelruns!!!');
    });

  });

  describe('PUT /api/modelruns/:id', function() {
    var updatedModelruns;

    beforeEach(function(done) {
      request(app)
        .put('/api/modelruns/' + newModelruns._id)
        .send({
          name: 'Updated Modelruns',
          info: 'This is the updated modelruns!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedModelruns = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedModelruns = {};
    });

    it('should respond with the updated modelruns', function() {
      updatedModelruns.name.should.equal('Updated Modelruns');
      updatedModelruns.info.should.equal('This is the updated modelruns!!!');
    });

  });

  describe('DELETE /api/modelruns/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/modelruns/' + newModelruns._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when modelruns does not exist', function(done) {
      request(app)
        .delete('/api/modelruns/' + newModelruns._id)
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
