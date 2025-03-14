const Profile = require('../models/Profile');
const fs = require('fs');
const path = require('path');

// Get profile
exports.getProfile = async (req, res) => {
    try {
        // Find the profile or create a default one
        let profile = await Profile.findOne();
        
        if (!profile) {
            profile = new Profile({
                name: 'John Doe',
                title: 'Web Developer',
                bio: 'I am a passionate web developer with experience in modern web technologies.',
                email: 'john@example.com',
                phone: '+1234567890',
                location: 'New York, USA'
            });
            
            await profile.save();
        }
        
        res.json({
            success: true,
            data: profile
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update profile (admin only)
exports.updateProfile = async (req, res) => {
    try {
        const { 
            name, 
            title, 
            bio, 
            email,
            phone,
            location,
            skills,
            interests
        } = req.body;
        
        // Find the profile or create a new one
        let profile = await Profile.findOne();
        
        if (!profile) {
            profile = new Profile({});
        }
        
        // Update fields
        if (name) profile.name = name;
        if (title) profile.title = title;
        if (bio !== undefined) profile.bio = bio;
        if (email) profile.email = email;
        if (phone) profile.phone = phone;
        if (location) profile.location = location;
        if (skills) profile.skills = skills;
        if (interests) profile.interests = interests;
        
        // Save the updated profile
        await profile.save();
        
        res.json({
            success: true,
            data: profile
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Upload avatar (admin only)
exports.uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an image'
            });
        }
        
        // Find the profile or create a new one
        let profile = await Profile.findOne();
        
        if (!profile) {
            profile = new Profile({});
        }
        
        // If there's an existing avatar, delete it
        if (profile.avatar) {
            const oldAvatarPath = path.join(__dirname, '..', profile.avatar);
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }
        }
        
        // Update avatar path
        profile.avatar = `/uploads/avatar/${req.file.filename}`;
        
        // Save the updated profile
        await profile.save();
        
        res.json({
            success: true,
            data: {
                avatar: profile.avatar
            }
        });
    } catch (error) {
        console.error('Error uploading avatar:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}; 