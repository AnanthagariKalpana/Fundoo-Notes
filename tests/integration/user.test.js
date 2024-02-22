import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';
import HttpStatus from 'http-status-codes';
import { note } from '@hapi/joi/lib/base';

var token;
var noteId;
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
          token = res.body.user;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          // expect(res.body.data).to.be.an('array');

          done();
        });
    });
  });

  
  describe('Create Note', function() {
    it('create a new Note', (done) => {
      const note = {
        "title": "First Note Testing",
        "description": "FirstNote Test1",
        "colour": "green"
      };
      
      request(app)
        .post('/api/v1/note')
        .set('Authorization', `Bearer ${token}`)
        .send(note)
        .end((err, res) => {
          console.log("Response:", res.statusCode, res.body.data._id);
          noteId = res.body.data._id;
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
      });
    });
  });

  describe('Get All Notes', function() {
    it('GetAllNote of the user', (done) => {
      request(app)
        .get('/api/v1/note')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          //console.log("Response:", res.statusCode, res.body._id);
          // noteId = res.body._id;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
      });
    });
  });

  describe('Get /note/byId', function() {
    it('GetNoteById', (done) => {
      
      request(app)
        .get(`/api/v1/note/${noteId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          console.log("Response:", res.statusCode, res.body.data._id);
          //noteId = res.body.data._id;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
      });
    });
  });

  describe('Put/updateNote',()=>{
    it('UpdateNote By id',(done)=>{
      const updatedNote = {
        "description":"Using testing updating note",
      }
      request(app)
      .put(`/api/v1/note/${noteId}`)
      .set('Authorization',`Bearer ${token}`)
      .send(updatedNote)
      .end((err, res) => {
        console.log("Response:", res.statusCode, res.body.data._id);
        //noteId = res.body.data._id;
        expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
        done();

    })
  });
});

describe('Put/ArchiveNote',()=>{
  it('Archive Note',(done)=>{
    request(app)
    .put(`/api/v1/note/${noteId}/archive`)
    .set('Authorization',`Bearer ${token}`)
    .end((err, res) => {
      //console.log("Response:", res.statusCode, res.body.data._id);
      //noteId = res.body.data._id;
      expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
      done();

  });
});
});

describe('Put/TrashNote',()=>{
  it('Trash Note',(done)=>{
    request(app)
    .put(`/api/v1/note/${noteId}/trash`)
    .set('Authorization',`Bearer ${token}`)
    .end((err, res) => {
      //console.log("Response:", res.statusCode, res.body.data._id);
      //noteId = res.body.data._id;
      expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
      done();

  });
});
});

describe('delete /note/byId', function() {
  it('DeleteNoteById', (done) => {
    
    request(app)
      .delete(`/api/v1/note/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        console.log("Response:", res.statusCode, res.body.data._id);
        //noteId = res.body.data._id;
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
    });
  });
});

});
