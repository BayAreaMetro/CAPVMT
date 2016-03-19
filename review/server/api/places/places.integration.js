'use strict';

var app = require('../..');
import request from 'supertest';

var newPlaces;

describe('Places API:', function() {

  describe('GET /api/places', function() {
    var placess;

    beforeEach(function(done) {
      request(app)
        .get('/api/places')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          placess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      placess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/places', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/places')
        .send({
          name: 'New Places',
          info: 'This is the brand new places!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPlaces = res.body;
          done();
        });
    });

    it('should respond with the newly created places', function() {
      newPlaces.name.should.equal('New Places');
      newPlaces.info.should.equal('This is the brand new places!!!');
    });

  });

  describe('GET /api/places/:id', function() {
    var places;

    beforeEach(function(done) {
      request(app)
        .get('/api/places/' + newPlaces._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          places = res.body;
          done();
        });
    });

    afterEach(function() {
      places = {};
    });

    it('should respond with the requested places', function() {
      places.name.should.equal('New Places');
      places.info.should.equal('This is the brand new places!!!');
    });

  });

  describe('PUT /api/places/:id', function() {
    var updatedPlaces;

    beforeEach(function(done) {
      request(app)
        .put('/api/places/' + newPlaces._id)
        .send({
          name: 'Updated Places',
          info: 'This is the updated places!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPlaces = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPlaces = {};
    });

    it('should respond with the updated places', function() {
      updatedPlaces.name.should.equal('Updated Places');
      updatedPlaces.info.should.equal('This is the updated places!!!');
    });

  });

  describe('DELETE /api/places/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/places/' + newPlaces._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when places does not exist', function(done) {
      request(app)
        .delete('/api/places/' + newPlaces._id)
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
