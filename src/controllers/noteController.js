
const noteService = require('../services/noteService');

exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await noteService.getAllNotes(req.userId);
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

exports.getNoteById = async (req, res, next) => {
  try {
    const note = await noteService.getNoteById(req.params.id, req.userId);
    res.json(note);
  } catch (error) {
    next(error);
  }
};

exports.createNote = async (req, res, next) => {
  try {
    const note = await noteService.createNote(req.body, req.userId);
    console.log(note)
    res.json(note);
  } catch (error) {
    next(error);
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const note = await noteService.updateNote(req.params.id, req.body, req.userId);
    res.json(note);
  } catch (error) {
    next(error);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    await noteService.deleteNote(req.params.id, req.userId);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.shareNote = async (req, res, next) => {
  try {
    await noteService.shareNote(req.params.id, req.body.username, req.userId);
    res.json({ message: 'Note shared successfully' });
  } catch (error) {
    next(error);
  }
};

exports.searchNotes = async (req, res, next) => {
  try {
    const results = await noteService.searchNotes(req.query.q, req.userId);
    res.json(results);
  } catch (error) {
    next(error);
  }
};
