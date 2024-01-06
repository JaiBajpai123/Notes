const assert = require('assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../src/models/User');
const Note = require('../src/models/Note');

const request = supertest(app);

describe('Integration Tests', () => {
  before(async () => {
    
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    
    await mongoose.disconnect();
  });

  beforeEach(async () => {
   
    await User.deleteMany();
    await Note.deleteMany();
  });

  it('should sign up, log in, create, update, delete, and search notes', async function() {
    this.timeout(5000);
    
    const signupResponse = await request.post('/api/auth/signup').send({
      username: 'testuser',
      password: 'testpassword',
    });
    console.log(signupResponse.status)
    assert.strictEqual(signupResponse.status, 200);

    
    const loginResponse = await request.post('/api/auth/login').send({
      username: 'testuser',
      password: 'testpassword',
    });

    assert.strictEqual(loginResponse.status, 200);
    const token = loginResponse.body.token;

    
    const createNoteResponse = await request.post('/api/notes').send({
      content: 'Test note content',
      title: 'Test'
    }).set('Authorization', `${token}`);

    assert.strictEqual(createNoteResponse.status, 200);
    const noteId = createNoteResponse.body._id;

    
    const getAllNotesResponse = await request.get('/api/notes').set('Authorization', `${token}`);
    assert.strictEqual(getAllNotesResponse.status, 200);
    assert(Array.isArray(getAllNotesResponse.body));
    assert.strictEqual(getAllNotesResponse.body.length, 1);

    
    const updateNoteResponse = await request.put(`/api/notes/${noteId}`).send({
      content: 'Updated note content',
    }).set('Authorization', `${token}`);
    assert.strictEqual(updateNoteResponse.status, 200);

    
    const searchNotesResponse = await request.get('/api/notes/search?q=Updated').set('Authorization', `${token}`);
    assert.strictEqual(searchNotesResponse.status, 200);
    assert(Array.isArray(searchNotesResponse.body));
    assert.strictEqual(searchNotesResponse.body.length, 1);

    
    const deleteNoteResponse = await request.delete(`/api/notes/${noteId}`).set('Authorization', `${token}`);
    assert.strictEqual(deleteNoteResponse.status, 200);

    
    const checkDeletedNoteResponse = await request.get('/api/notes').set('Authorization', `${token}`);
    assert.strictEqual(checkDeletedNoteResponse.status, 200);
    assert(Array.isArray(checkDeletedNoteResponse.body));
    assert.strictEqual(checkDeletedNoteResponse.body.length, 0);
  });
});
