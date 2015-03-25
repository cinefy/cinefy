'use strict';

process.env.MONGO_URI = 'mongodb://localhost/users_test';
require('../server.js');

var chai = require('chai');
var chaihttp = require('chai-http');
var mongoose = require('mongoose');

chai.use(chaihttp);

var expect = chai.expect;

describe('user route end points', function() {
  var testToken;

  before(function(done) {
    chai.request('localhost:3000/api/v1')
    .post('/create_user')
    .send({name: 'token', password: 'tokens'})
    .end(function(err,res){
      expect(err).to.eql(null);
      testToken = res.body.eat;
      done();
    });
  });

  before(function(done) {
    chai.request('localhost:3000/api/v1')
    .post('/item')
    .send({name: 'testItem', picture: 'testLink', time: 10, eat: testToken})
    .end(function(err, res) {
      expect(err).to.eql(null);
      done();
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should create new user', function(done) {
    chai.request('localhost:3000/api/v1')
    .post('/create_user')
    .send({name: 'test', password: 'testpass'})
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('eat');
      expect(res.body).to.have.property('name');
      expect(res.body.name).to.eql('test');
      done();
    });
  });

  it('should fail to create non-unique user', function(done) {
    chai.request('localhost:3000/api/v1')
    .post('/create_user')
    .send({name: 'test', password: 'testpass'})
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('user already created');
      done();
    });
  });

  it('should provide token upon user sign in', function(done) {
    chai.request('localhost:3000/api/v1')
    .get('/sign_in')
    .auth('test', 'testpass')
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('eat');
      expect(res.body).to.have.property('name');
      expect(res.body.name).to.eql('test');
      done();
    });
  });

  it('should fail to provide token without valid user sign in', function(done) {
    chai.request('localhost:3000/api/v1')
    .get('/sign_in')
    .auth('test', 'wrongpass')
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(500);
      expect(res.body.eat).to.eql(undefined);
      done();
    });
  });

  it('should add liked item to user profile', function(done) {
    chai.request('localhost:3000/api/v1')
    .put('/like_item/testItem')
    .send({name:'test' ,eat: testToken})
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(res.body.basic.name).to.eql('test');
      expect(Array.isArray(res.body.likes)).to.eql(true);
      expect(JSON.parse(res.body.likes[0]).name).to.eql('testItem');
      expect(JSON.parse(res.body.likes[0]).picture).to.eql('testLink');
      expect(JSON.parse(res.body.likes[0]).time).to.eql(10);
      done();
    });
  });

  it('should fail to add liked item without valid token', function(done) {
    chai.request('localhost:3000/api/v1')
    .put('/like_item/testItem')
    .send({name:'test'})
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(403);
      expect(res.body.msg).to.eql('could not authenticate');
      done();
    });
  });

  it('should get user likes', function(done) {
    chai.request('localhost:3000/api/v1')
    .get('/get_likes/test')
    .send({eat:testToken})
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(JSON.parse(res.body[0]).name).to.eql('testItem');
      expect(JSON.parse(res.body[0]).picture).to.eql('testLink');
      expect(JSON.parse(res.body[0]).time).to.eql(10);
      done();
    });
  });

  it('should fail to get user likes without valid token', function(done) {
    chai.request('localhost:3000/api/v1')
    .get('/get_likes/test')
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(403);
      expect(res.body.msg).to.eql('could not authenticate');
      done();
    });
  });

  it('should fail to delete user without valid token', function(done) {
    chai.request('localhost:3000/api/v1')
    .delete('/delete_user/test')
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(403);
      expect(res.body.msg).to.eql('could not authenticate');
      done();
    });
  });

  it('should delete user', function(done) {
    chai.request('localhost:3000/api/v1')
    .delete('/delete_user/test')
    .send({eat:testToken})
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(res.body.basic.name).to.eql('test');
      done();
    });
  });

});