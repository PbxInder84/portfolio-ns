const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/authMiddleware');
const blogController = require('../controllers/blogController');

// Public routes
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);

// User routes - require authentication
router.post('/:id/save', auth, blogController.saveBlog);
router.delete('/:id/save', auth, blogController.unsaveBlog);
router.get('/saved', auth, blogController.getSavedBlogs);

// Admin routes - require authentication and admin role
router.post('/', auth, adminOnly, blogController.createBlog);
router.put('/:id', auth, adminOnly, blogController.updateBlog);
router.delete('/:id', auth, adminOnly, blogController.deleteBlog);
router.post('/:id/image', auth, adminOnly, blogController.uploadBlogImage);

module.exports = router; 