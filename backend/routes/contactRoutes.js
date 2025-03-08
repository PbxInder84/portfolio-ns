const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/contactController');

router.post('/submit', sendContactEmail);

module.exports = router; 