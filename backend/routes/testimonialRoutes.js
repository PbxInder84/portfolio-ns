const express = require('express');
const router = express.Router();
const { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getTestimonials);
router.post('/', authMiddleware, addTestimonial);
router.put('/:id', authMiddleware, updateTestimonial);
router.delete('/:id', authMiddleware, deleteTestimonial);

module.exports = router; 