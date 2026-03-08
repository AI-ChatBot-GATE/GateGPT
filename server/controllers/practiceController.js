const PracticeResult = require('../models/PracticeResult');

const submitResult = async (req, res) => {
    const { subject, topic, score, totalQuestions, difficulty, timeTaken } = req.body;

    try {
        const result = await PracticeResult.create({
            userId: req.user._id,
            subject,
            topic,
            score,
            totalQuestions,
            difficulty,
            timeTaken,
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserAnalytics = async (req, res) => {
    try {
        const results = await PracticeResult.find({ userId: req.user._id });

        // Calculate basic analytics
        const subjectStats = results.reduce((acc, curr) => {
            if (!acc[curr.subject]) {
                acc[curr.subject] = { totalScore: 0, totalQuestions: 0, attempts: 0 };
            }
            acc[curr.subject].totalScore += curr.score;
            acc[curr.subject].totalQuestions += curr.totalQuestions;
            acc[curr.subject].attempts += 1;
            return acc;
        }, {});

        res.json({
            history: results,
            stats: subjectStats,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { submitResult, getUserAnalytics };
