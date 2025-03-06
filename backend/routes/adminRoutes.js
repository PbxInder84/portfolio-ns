const express = require('express');
const router = express.Router();
const { manageContent } = require('../controllers/adminController');

router.post('/manage', manageContent);

module.exports = router; 