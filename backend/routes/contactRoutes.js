const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/authMiddleware');
const contactController = require('../controllers/contactController');

// Public routes
router.post('/', contactController.submitContact);

// Admin routes - require authentication and admin role
router.get('/', auth, adminOnly, contactController.getMessages);
router.get('/:id', auth, adminOnly, contactController.getMessage);
router.put('/:id/read', auth, adminOnly, contactController.markMessageAsRead);
router.delete('/:id', auth, adminOnly, contactController.deleteMessage);
router.post('/:id/reply', auth, adminOnly, contactController.replyToMessage);

module.exports = router; 