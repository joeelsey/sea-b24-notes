process.env.MONGO_URL = 'mongodb://localhost/auth_test';
var chai = require('chai');
var chaihttp = require('chai-http');
var User = require('../../models/user');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

User.collection.remove(function(err){
  if(err) throw(err);
});

describe('basic notes auth', function() {
  var id;
  var jwtToken;

  before(function (done) {
    chai.request('http://localhost:3000')
    .post('/api/users')
    .send({email: 'test@example.com', password: 'foobar123'})
    .end(function (err, res) {
      jwtToken = res.body.jwt;
      done();
    });
  });

  it('should be able to get a user', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/users')
    .auth('test@example.com','foobar123')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt')
      done();
    });
  });

  it('should be able to create a user', function(done){
    chai.request('http://localhost:3000')
      .post('/api/users/')
      .set({jwt: jwtToken})
      .end(function(err,res){
        expect(err).to.eql(null);
        expect(res.body).to.have.property('jwt');
        id = res.body._id;
        done();
      });
  });
});
