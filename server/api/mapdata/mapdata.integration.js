'use strict';

var app = require('../..');
import request from 'supertest';

var newMapdata;

describe('Mapdata API:', function() {

  describe('GET /api/mapdata', function() {
    var mapdatas;

    beforeEach(function(done) {
      request(app)
        .get('/api/mapdata')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          mapdatas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      mapdatas.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/mapdata', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/mapdata')
        .send({
          name: 'New Mapdata',
          info: 'This is the brand new mapdata!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMapdata = res.body;
          done();
        });
    });

    it('should respond with the newly created mapdata', function() {
      newMapdata.name.should.equal('New Mapdata');
      newMapdata.info.should.equal('This is the brand new mapdata!!!');
    });

  });

  describe('GET /api/mapdata/:id', function() {
    var mapdata;

    beforeEach(function(done) {
      request(app)
        .get('/api/mapdata/' + newMapdata._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          mapdata = res.body;
          done();
        });
    });

    afterEach(function() {
      mapdata = {};
    });

    it('should respond with the requested mapdata', function() {
      mapdata.name.should.equal('New Mapdata');
      mapdata.info.should.equal('This is the brand new mapdata!!!');
    });

  });

  describe('PUT /api/mapdata/:id', function() {
    var updatedMapdata;

    beforeEach(function(done) {
      request(app)
        .put('/api/mapdata/' + newMapdata._id)
        .send({
          name: 'Updated Mapdata',
          info: 'This is the updated mapdata!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMapdata = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMapdata = {};
    });

    it('should respond with the updated mapdata', function() {
      updatedMapdata.name.should.equal('Updated Mapdata');
      updatedMapdata.info.should.equal('This is the updated mapdata!!!');
    });

  });

  describe('DELETE /api/mapdata/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/mapdata/' + newMapdata._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when mapdata does not exist', function(done) {
      request(app)
        .delete('/api/mapdata/' + newMapdata._id)
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
