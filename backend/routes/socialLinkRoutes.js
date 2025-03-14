const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/authMiddleware');
const socialLinkController = require('../controllers/socialLinkController');

// Public routes - no authentication required
router.get('/', socialLinkController.getSocialLinks);

// Admin routes - require authentication and admin role
router.put('/', auth, adminOnly, socialLinkController.updateSocialLinks);

module.exports = router; 