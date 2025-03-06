const express = require('express');
const router = express.Router();
const { getBlogs, addBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getBlogs);
router.post('/', authMiddleware, addBlog);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router; 