const express = require('express');
const router = express.Router();
const { upload, uploadResume, getResume } = require('../controllers/resumeController');

router.post('/', upload.single('resume'), uploadResume);
router.get('/:filename', getResume);

module.exports = router; 