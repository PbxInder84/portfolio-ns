const express = require('express');
const router = express.Router();
const { getSocialLinks, addSocialLink, updateSocialLink, deleteSocialLink } = require('../controllers/socialLinksController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getSocialLinks);
router.post('/', authMiddleware, addSocialLink);
router.put('/:id', authMiddleware, updateSocialLink);
router.delete('/:id', authMiddleware, deleteSocialLink);

module.exports = router; 