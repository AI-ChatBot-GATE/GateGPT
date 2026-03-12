const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    formulas: [String],
    pyqs: [{
        question: String,
        solution: String,
        year: Number
    }],
});

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    icon: { type: String },
    description: { type: String },
    topics: [topicSchema],
    questions: [{
        question: String,
        options: [String],
        correct: Number,
        explanation: String,
        difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' }
    }],
}, {
    timestamps: true,
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
