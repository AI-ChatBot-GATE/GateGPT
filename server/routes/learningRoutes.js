const express = require('express');
const { getSubjects, getSubjectByName } = require('../controllers/subjectController');
const { submitResult, getUserAnalytics } = require('../controllers/practiceController');
const { protect } = require('../middleware/authMiddleware');

const { solvePyq, getRevisionNotes } = require('../controllers/aiToolController');

const router = express.Router();

router.use(protect);

router.get('/subjects', getSubjects);
router.get('/subjects/:name', getSubjectByName);
router.post('/practice/submit', submitResult);
router.get('/analytics', getUserAnalytics);

// AI Tools
router.post('/ai/solve-pyq', solvePyq);
router.post('/ai/revision-notes', getRevisionNotes);

module.exports = router;
