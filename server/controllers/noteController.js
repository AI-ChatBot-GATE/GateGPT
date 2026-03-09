const Note = require('../models/Note');

// @desc    Get all user notes
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res) => {
    try {
        const { title, content, subject, chatId, isBookmarked } = req.body;

        const note = await Note.create({
            userId: req.user._id,
            title,
            content,
            subject,
            chatId,
            isBookmarked: isBookmarked || false
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a note
// @route   PATCH /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (note && note.userId.toString() === req.user._id.toString()) {
            note.title = req.body.title || note.title;
            note.content = req.body.content || note.content;
            note.subject = req.body.subject || note.subject;
            note.isBookmarked = req.body.isBookmarked !== undefined ? req.body.isBookmarked : note.isBookmarked;

            const updatedNote = await note.save();
            res.json(updatedNote);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (note && note.userId.toString() === req.user._id.toString()) {
            await note.deleteOne();
            res.json({ message: 'Note removed' });
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
};
