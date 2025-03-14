const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    institution: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    field: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    description: {
        type: String
    },
    location: {
        type: String
    }
});

const experienceSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    current: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    achievements: {
        type: [String]
    }
});

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    technologies: {
        type: [String]
    },
    link: {
        type: String
    }
});

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        min: 1,
        max: 5
    },
    category: {
        type: String
    }
});

const resumeSchema = new mongoose.Schema({
    education: {
        type: [educationSchema],
        default: []
    },
    experience: {
        type: [experienceSchema],
        default: []
    },
    skills: {
        type: [skillSchema],
        default: []
    },
    projects: {
        type: [projectSchema],
        default: []
    },
    certifications: {
        type: [String],
        default: []
    },
    languages: {
        type: [String],
        default: []
    },
    interests: {
        type: [String],
        default: []
    },
    summary: {
        type: String
    },
    filePath: {
        type: String
    },
    fileName: {
        type: String
    },
    fileType: {
        type: String
    },
    fileSize: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resume', resumeSchema); 