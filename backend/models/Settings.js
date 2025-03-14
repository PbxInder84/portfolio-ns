const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    // Site Information
    siteName: {
        type: String,
        default: 'My Portfolio'
    },
    siteDescription: {
        type: String,
        default: 'Welcome to my portfolio website'
    },
    siteKeywords: {
        type: [String],
        default: ['portfolio', 'developer', 'web']
    },
    
    // Contact Information
    email: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    
    // Social Media Links
    socialLinks: {
        github: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        twitter: { type: String, default: '' },
        facebook: { type: String, default: '' },
        instagram: { type: String, default: '' },
        youtube: { type: String, default: '' }
    },
    
    // Appearance
    primaryColor: {
        type: String,
        default: '#3f51b5'
    },
    secondaryColor: {
        type: String,
        default: '#f50057'
    },
    fontFamily: {
        type: String,
        default: 'Roboto, sans-serif'
    },
    logo: {
        type: String,
        default: ''
    },
    favicon: {
        type: String,
        default: ''
    },
    
    // Features Toggle
    darkMode: {
        type: Boolean,
        default: false
    },
    showResume: {
        type: Boolean,
        default: true
    },
    showProjects: {
        type: Boolean,
        default: true
    },
    showBlog: {
        type: Boolean,
        default: true
    },
    showTestimonials: {
        type: Boolean,
        default: true
    },
    showContact: {
        type: Boolean,
        default: true
    },
    
    // SEO Settings
    googleAnalyticsId: {
        type: String,
        default: ''
    },
    metaImage: {
        type: String,
        default: ''
    },
    
    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
settingsSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Settings', settingsSchema); 