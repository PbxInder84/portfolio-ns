const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    longDescription: {
        type: String
    },
    technologies: {
        type: [String],
        default: []
    },
    image: {
        type: String
    },
    images: {
        type: [String],
        default: []
    },
    githubLink: {
        type: String
    },
    demoLink: {
        type: String
    },
    category: {
        type: String
    },
    features: {
        type: [{
            title: String,
            description: String
        }],
        default: []
    },
    technicalDetails: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema); 