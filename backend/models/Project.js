const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    githubLink: { type: String },
    liveDemoLink: { type: String },
    images: { type: [String] }
});

module.exports = mongoose.model('Project', projectSchema); 