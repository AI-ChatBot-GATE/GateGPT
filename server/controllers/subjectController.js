const Subject = require('../models/Subject');

const getSubjects = async (_req, res) => {
    try {
        const subjects = await Subject.find({});
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSubjectByName = async (req, res) => {
    try {
        const subject = await Subject.findOne({
            name: { $regex: new RegExp(`^${req.params.name}$`, 'i') }
        });
        if (subject) {
            res.json(subject);
        } else {
            res.status(404).json({ message: 'Subject not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSubjects, getSubjectByName };
