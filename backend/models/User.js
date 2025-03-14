const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user',
        required: true 
    },
    bio: { type: String },
    profileImage: { type: String },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    lastLogin: { 
        type: Date 
    },
    savedBlogs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Blog',
        default: []
    }
});

module.exports = mongoose.model('User', userSchema); 