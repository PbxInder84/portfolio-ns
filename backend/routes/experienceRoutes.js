const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/authMiddleware');
const experienceController = require('../controllers/experienceController');

// Get all experience entries
router.get('/', experienceController.getExperiences);

// Admin routes - require authentication and admin role
router.post('/', auth, adminOnly, experienceController.addExperience);
router.put('/:id', auth, adminOnly, experienceController.updateExperience);
router.delete('/:id', auth, adminOnly, experienceController.deleteExperience);

module.exports = router; 