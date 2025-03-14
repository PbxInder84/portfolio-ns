const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
    github: {
        type: String,
        default: ''
    },
    linkedin: {
        type: String,
        default: ''
    },
    twitter: {
        type: String,
        default: ''
    },
    facebook: {
        type: String,
        default: ''
    },
    instagram: {
        type: String,
        default: ''
    },
    youtube: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SocialLink', socialLinkSchema); 