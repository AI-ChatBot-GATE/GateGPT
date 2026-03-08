const express = require('express');
const {
    getChats,
    createChat,
    getMessages,
    sendMessage,
    updateChat,
    deleteChat,
    shareChat,
    getSharedChat
} = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // Protect all chat routes

router.route('/')
    .get(getChats)
    .post(createChat);

router.route('/:id')
    .patch(updateChat)
    .delete(deleteChat);

router.route('/:id/messages')
    .get(getMessages)
    .post(sendMessage);

router.post('/:id/share', shareChat);

// Public route (unprotected)
router.get('/share/:shareId', getSharedChat);

module.exports = router;
