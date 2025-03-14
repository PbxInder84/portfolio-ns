const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/authMiddleware');
const educationController = require('../controllers/educationController');

// Get all education entries
router.get('/', educationController.getEducation);

// Admin routes - require authentication and admin role
router.post('/', auth, adminOnly, educationController.addEducation);
router.put('/:id', auth, adminOnly, educationController.updateEducation);
router.delete('/:id', auth, adminOnly, educationController.deleteEducation);

module.exports = router; 