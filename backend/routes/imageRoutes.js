const express = require('express');
const router = express.Router();
const { uploadImage, getImages, deleteImage } = require('../controllers/imageController');
const upload = require('../config/multerConfig');

// Get all images
router.get('/', getImages);

// Upload an image
router.post('/upload', upload.single('image'), uploadImage);

// Delete an image
router.delete('/:id', deleteImage);

module.exports = router; 