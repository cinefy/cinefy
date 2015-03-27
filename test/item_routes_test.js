'use strict';

process.env.MONGO_URI = 'mongodb://localhost/items_test';
require('../server.js');

var chai = require('chai');
var chaihttp = require('chai-http');
var mongoose = require('mongoose');

chai.use(chaihttp);

var expect = chai.expect;

describe('item route end points', function() {
  var testToken;

  before(function(done) {
    chai.request('localhost:3000/api/v1')
    .post('/create_user')
    .send({name: 'test', password: 'testpass'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      testToken = res.body.eat;
      done();
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should accept item post request', function(done) {
    chai.request('localhost:3000/api/v1')
    .post('/item')
    .send({name:'testThing', picture:'testLink', time: 50, eat: testToken})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('testThing');
      expect(res.body.picture).to.eql('testLink');
      expect(res.body.time).to.eql(50);
      done();
    });
  });

  it('should not accept item post request without valid token', function(done) {
    chai.request('localhost:3000/api/v1')
    .post('/item')
    .send({name:'test', picture:"testLink", time:100})
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(403);
      done();
    });
  });

  it('should get items', function(done) {
    chai.request('localhost:3000/api/v1')
    .get('/item')
    .send({eat:testToken})
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body[0]).to.have.property('name');
      expect(res.body[0]).to.have.property('picture');
      expect(res.body[0]).to.have.property('time');
      done();
    });
  });

  it('should not get items without valid token', function(done) {
    chai.request('localhost:3000/api/v1')
    .get('/item')
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(403);
      expect(res.body.msg).to.eql('could not authenticate');
      done();
    });
  });

});