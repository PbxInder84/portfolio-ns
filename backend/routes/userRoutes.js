const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Get current user
router.get('/me', auth, userController.getCurrentUser);

// Update user profile
router.put('/profile', auth, userController.updateProfile);

// Change password
router.put('/change-password', auth, userController.changePassword);

// Delete account
router.delete('/account', auth, userController.deleteAccount);

module.exports = router; 