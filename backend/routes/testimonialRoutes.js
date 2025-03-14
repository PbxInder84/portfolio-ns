const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/authMiddleware');
const testimonialController = require('../controllers/testimonialController');

// Public routes
router.get('/', testimonialController.getTestimonials);

// User routes - require authentication
router.post('/', auth, testimonialController.addTestimonial);

// Admin routes - require authentication and admin role
router.put('/:id', auth, adminOnly, testimonialController.updateTestimonial);
router.delete('/:id', auth, adminOnly, testimonialController.deleteTestimonial);
router.put('/:id/approve', auth, adminOnly, testimonialController.approveTestimonial);

module.exports = router; 