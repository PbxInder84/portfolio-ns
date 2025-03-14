const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/authMiddleware');
const resumeController = require('../controllers/resumeController');
const upload = require('../config/multerConfig');

// Public routes
router.get('/', resumeController.getResume);
router.get('/download', resumeController.downloadResume);

// Admin routes - require authentication and admin role
router.put('/', auth, adminOnly, resumeController.updateResume);
router.post('/upload', auth, adminOnly, upload.single('resume'), resumeController.uploadResumeFile);

module.exports = router; 