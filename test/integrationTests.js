
const { expect } = require('chai');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../src/models/User');
const Note = require('../src/models/Note');

const request = supertest(app);

describe('Integration Tests', () => {
  before(async () => {
    // Connect to a test database
    await mongoose.connect('mongodb://localhost:27017/test-database', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    // Disconnect from the test database after all tests
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear the User and Note collections before each test
    await User.deleteMany();
    await Note.deleteMany();
  });

  it('should sign up, log in, create, update, delete, and search notes', async () => {
    // Signup
    const signupResponse = await request.post('/api/auth/signup').send({
      username: 'testuser',
      password: 'testpassword',
    });

    expect(signupResponse.status).to.equal(200);

    // Login and get the token
    const loginResponse = await request.post('/api/auth/login').send({
      username: 'testuser',
      password: 'testpassword',
    });

    expect(loginResponse.status).to.equal(200);
    const token = loginResponse.body.token;

    // Create a note
    const createNoteResponse = await request.post('/api/notes').send({
      content: 'Test note content',
    }).set('Authorization', `Bearer ${token}`);

    expect(createNoteResponse.status).to.equal(200);
    const noteId = createNoteResponse.body._id;

    // Get all notes
    const getAllNotesResponse = await request.get('/api/notes').set('Authorization', `Bearer ${token}`);
    expect(getAllNotesResponse.status).to.equal(200);
    expect(getAllNotesResponse.body).to.be.an('array').that.has.lengthOf(1);

    // Update the note
    const updateNoteResponse = await request.put(`/api/notes/${noteId}`).send({
      content: 'Updated note content',
    }).set('Authorization', `Bearer ${token}`);
    expect(updateNoteResponse.status).to.equal(200);

    // Search for notes
    const searchNotesResponse = await request.get('/api/notes/search?q=Updated').set('Authorization', `Bearer ${token}`);
    expect(searchNotesResponse.status).to.equal(200);
    expect(searchNotesResponse.body).to.be.an('array').that.has.lengthOf(1);

    // Delete the note
    const deleteNoteResponse = await request.delete(`/api/notes/${noteId}`).set('Authorization', `Bearer ${token}`);
    expect(deleteNoteResponse.status).to.equal(200);

    // Ensure the note is deleted
    const checkDeletedNoteResponse = await request.get('/api/notes').set('Authorization', `Bearer ${token}`);
    expect(checkDeletedNoteResponse.status).to.equal(200);
    expect(checkDeletedNoteResponse.body).to.be.an('array').that.has.lengthOf(0);
  });
});
