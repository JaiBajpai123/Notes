const assert = require('assert');
const noteService = require('../src/services/noteService');
const Note = require('../src/models/Note');

describe('Unit Tests', () => {
  describe('Note Service', () => {
    describe('searchNotes', () => {
      it('should return notes matching the search query', async () => {
        const userId = 'user123';
        const query = 'meeting';

        
        const originalFind = Note.find;
        Note.find = async (queryObj) => {
          assert.deepStrictEqual(queryObj, { $text: { $search: query }, user: userId });
          return [{ content: 'Meeting notes', user: userId }];
        };

        try {
          const result = await noteService.searchNotes(query, userId);

          
          assert.deepStrictEqual(result, [{ content: 'Meeting notes', user: userId }]);
        } finally {
         
          Note.find = originalFind;
        }
      });

      it('should handle errors during search', async () => {
        const userId = 'user123';
        const query = 'error';

        
        const originalFind = Note.find;
        Note.find = async () => {
          throw new Error('Database error');
        };

        try {
          await assert.rejects(async () => {
            await noteService.searchNotes(query, userId);
          }, { message: 'Database error' });
        } finally {
          
          Note.find = originalFind;
        }
      });
    });
  });
});
