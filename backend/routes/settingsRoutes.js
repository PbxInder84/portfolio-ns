const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/authMiddleware');
const settingsController = require('../controllers/settingsController');
const upload = require('../config/multerConfig');

// Public routes - no authentication required
router.get('/', settingsController.getSettings);

// Admin routes - require authentication and admin role
router.put('/', auth, adminOnly, settingsController.updateSettings);
router.post('/logo', auth, adminOnly, upload.single('logo'), settingsController.uploadLogo);
router.post('/favicon', auth, adminOnly, upload.single('favicon'), settingsController.uploadFavicon);
router.post('/meta-image', auth, adminOnly, upload.single('metaImage'), settingsController.uploadMetaImage);

module.exports = router; 