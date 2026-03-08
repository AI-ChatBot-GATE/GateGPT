const mongoose = require('mongoose');

const practiceResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    subject: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium',
    },
    timeTaken: {
        type: Number, // in seconds
        required: true,
    },
}, {
    timestamps: true,
});

const PracticeResult = mongoose.model('PracticeResult', practiceResultSchema);

module.exports = PracticeResult;
