const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    image: { type: String }
});

module.exports = mongoose.model('Testimonial', testimonialSchema); 