
const { expect } = require('chai');
const sinon = require('sinon');
const noteService = require('../src/services/noteService');
const Note = require('../src/models/Note');

describe('Unit Tests', () => {
  describe('Note Service', () => {
    describe('searchNotes', () => {
      it('should return notes matching the search query', async () => {
        const userId = 'user123';
        const query = 'meeting';

        // Stub the find method of the Note model
        const findStub = sinon.stub(Note, 'find').resolves([{ content: 'Meeting notes', user: userId }]);

        const result = await noteService.searchNotes(query, userId);

        // Assert that the find method was called with the correct arguments
        expect(findStub.calledWith({ $text: { $search: query }, user: userId })).to.be.true;

        // Assert the result
        expect(result).to.deep.equal([{ content: 'Meeting notes', user: userId }]);

        // Restore the stub
        findStub.restore();
      });

      it('should handle errors during search', async () => {
        const userId = 'user123';
        const query = 'error';

        // Stub the find method to simulate an error
        const findStub = sinon.stub(Note, 'find').rejects(new Error('Database error'));

        try {
          await noteService.searchNotes(query, userId);
        } catch (error) {
          // Assert that the error is handled appropriately
          expect(error.message).to.equal('Database error');
        }

        // Restore the stub
        findStub.restore();
      });
    });
  });
});
