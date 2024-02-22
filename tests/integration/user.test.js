import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';
import HttpStatus from 'http-status-codes';

var token;

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('POST /users', () => {
    it('Create a new User', (done) => {
      const user={
        "name":"Sudheer",
        "email":"sudheer@gmail",
        "password":"sudheer123"
      };

      request(app)
        .post('/api/v1/users/')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          // expect(res.body.data).to.be.an('array');

          done();
        });
    });
  });

  describe('Post /users/login',()=>{
    it('user has login', (done) => {
      const user={
        "email":"sudheer@gmail",
        "password":"sudheer123"
      }
      request(app)
        .post('/api/v1/users/login')
        .send(user)
        .end((err, res) => {
          token = res.body
          console.log(token);
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          // expect(res.body.data).to.be.an('array');

          done();
        });
    });
  });

});

