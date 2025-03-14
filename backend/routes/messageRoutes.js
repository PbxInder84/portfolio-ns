const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/authMiddleware');
const messageController = require('../controllers/messageController');

// Admin routes - require authentication and admin role
router.get('/', auth, adminOnly, messageController.getMessages);
router.get('/:id', auth, adminOnly, messageController.getMessage);
router.put('/:id/read', auth, adminOnly, messageController.markMessageAsRead);
router.delete('/:id', auth, adminOnly, messageController.deleteMessage);
router.post('/:id/reply', auth, adminOnly, messageController.replyToMessage);

module.exports = router; 