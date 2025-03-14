const Experience = require('../models/Experience');

// Get all experience entries
exports.getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ startDate: -1 });
        
        res.json({
            success: true,
            count: experiences.length,
            data: experiences
        });
    } catch (error) {
        console.error('Error fetching experiences:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Add new experience entry (admin only)
exports.addExperience = async (req, res) => {
    try {
        const { 
            company, 
            position, 
            startDate, 
            endDate,
            current,
            description,
            location,
            achievements
        } = req.body;
        
        // Validate required fields
        if (!company || !position) {
            return res.status(400).json({
                success: false,
                message: 'Company and position are required'
            });
        }
        
        // Create new experience entry
        const experience = new Experience({
            company,
            position,
            startDate,
            endDate,
            current,
            description,
            location,
            achievements
        });
        
        await experience.save();
        
        res.status(201).json({
            success: true,
            data: experience
        });
    } catch (error) {
        console.error('Error adding experience:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update experience entry (admin only)
exports.updateExperience = async (req, res) => {
    try {
        const { 
            company, 
            position, 
            startDate, 
            endDate,
            current,
            description,
            location,
            achievements
        } = req.body;
        
        // Build experience object
        const experienceFields = {};
        if (company) experienceFields.company = company;
        if (position) experienceFields.position = position;
        if (startDate) experienceFields.startDate = startDate;
        if (endDate) experienceFields.endDate = endDate;
        if (current !== undefined) experienceFields.current = current;
        if (description !== undefined) experienceFields.description = description;
        if (location) experienceFields.location = location;
        if (achievements) experienceFields.achievements = achievements;
        
        let experience = await Experience.findById(req.params.id);
        
        if (!experience) {
            return res.status(404).json({
                success: false,
                message: 'Experience entry not found'
            });
        }
        
        // Update experience entry
        experience = await Experience.findByIdAndUpdate(
            req.params.id,
            { $set: experienceFields },
            { new: true }
        );
        
        res.json({
            success: true,
            data: experience
        });
    } catch (error) {
        console.error('Error updating experience:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete experience entry (admin only)
exports.deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        
        if (!experience) {
            return res.status(404).json({
                success: false,
                message: 'Experience entry not found'
            });
        }
        
        await experience.remove();
        
        res.json({
            success: true,
            message: 'Experience entry removed'
        });
    } catch (error) {
        console.error('Error deleting experience:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}; 