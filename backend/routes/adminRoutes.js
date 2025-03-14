const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// All routes require authentication and admin role
router.use(auth);
router.use(adminOnly);

// Admin routes
router.get('/stats', adminController.getStats);
router.get('/stats/visitors', adminController.getVisitorStats);
router.get('/stats/pageviews', adminController.getPageViewStats);
router.get('/users', adminController.getUsers);
router.delete('/users/:id', adminController.deleteUser);
// Add more admin routes as needed

module.exports = router; 