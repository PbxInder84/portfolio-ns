const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');
const upload = require('../config/multerConfig');

// Get profile
router.get('/', profileController.getProfile);

// Admin routes - require authentication and admin role
router.put('/', auth, adminOnly, profileController.updateProfile);
router.post('/avatar', auth, adminOnly, upload.single('avatar'), profileController.uploadAvatar);

module.exports = router; 