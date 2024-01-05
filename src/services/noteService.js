
const Note = require('../models/Note');
const User = require('../models/User');

exports.getAllNotes = async (userId) => {
  return Note.find({ user: userId });
};

exports.getNoteById = async (noteId, userId) => {
  return Note.findOne({ _id: noteId, user: userId });
};

exports.createNote = async (noteData, userId) => {
  const note = new Note({ ...noteData, user: userId });
  await note.save();
  return note;
};

exports.updateNote = async (noteId, updatedNote, userId) => {
  const note = await Note.findOneAndUpdate({ _id: noteId, user: userId }, updatedNote, { new: true });
  if (!note) throw new Error('Note not found or you do not have permission');
  return note;
};

exports.deleteNote = async (noteId, userId) => {
  const note = await Note.findOneAndDelete({ _id: noteId, user: userId });
  if (!note) throw new Error('Note not found or you do not have permission');
};

exports.shareNote = async (noteId, username, userId) => {
  const userToShareWith = await User.findOne({ username });
  if (!userToShareWith) throw new Error('User not found');

  const note = await Note.findOne({ _id: noteId, user: userId });
  if (!note) throw new Error('Note not found or you do not have permission');

  note.sharedWith.push(userToShareWith._id);
  await note.save();
};

exports.searchNotes = async (query, userId) => {
  return Note.find({ user: userId, $text: { $search: query } });
};
