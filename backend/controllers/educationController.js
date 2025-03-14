const Education = require('../models/Education');

// Get all education entries
exports.getEducation = async (req, res) => {
    try {
        const education = await Education.find().sort({ endDate: -1 });
        
        res.json({
            success: true,
            count: education.length,
            data: education
        });
    } catch (error) {
        console.error('Error fetching education:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Add new education entry (admin only)
exports.addEducation = async (req, res) => {
    try {
        const { 
            institution, 
            degree, 
            field, 
            startDate,
            endDate,
            description,
            location
        } = req.body;
        
        // Validate required fields
        if (!institution || !degree) {
            return res.status(400).json({
                success: false,
                message: 'Institution and degree are required'
            });
        }
        
        // Create new education entry
        const education = new Education({
            institution,
            degree,
            field,
            startDate,
            endDate,
            description,
            location
        });
        
        await education.save();
        
        res.status(201).json({
            success: true,
            data: education
        });
    } catch (error) {
        console.error('Error adding education:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update education entry (admin only)
exports.updateEducation = async (req, res) => {
    try {
        const { 
            institution, 
            degree, 
            field, 
            startDate,
            endDate,
            description,
            location
        } = req.body;
        
        // Build education object
        const educationFields = {};
        if (institution) educationFields.institution = institution;
        if (degree) educationFields.degree = degree;
        if (field) educationFields.field = field;
        if (startDate) educationFields.startDate = startDate;
        if (endDate) educationFields.endDate = endDate;
        if (description !== undefined) educationFields.description = description;
        if (location) educationFields.location = location;
        
        let education = await Education.findById(req.params.id);
        
        if (!education) {
            return res.status(404).json({
                success: false,
                message: 'Education entry not found'
            });
        }
        
        // Update education entry
        education = await Education.findByIdAndUpdate(
            req.params.id,
            { $set: educationFields },
            { new: true }
        );
        
        res.json({
            success: true,
            data: education
        });
    } catch (error) {
        console.error('Error updating education:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete education entry (admin only)
exports.deleteEducation = async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        
        if (!education) {
            return res.status(404).json({
                success: false,
                message: 'Education entry not found'
            });
        }
        
        await education.remove();
        
        res.json({
            success: true,
            message: 'Education entry removed'
        });
    } catch (error) {
        console.error('Error deleting education:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}; 