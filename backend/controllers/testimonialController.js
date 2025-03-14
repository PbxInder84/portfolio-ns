const Testimonial = require('../models/Testimonial');

// Get all approved testimonials (public)
exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ approved: true })
            .sort({ createdAt: -1 })
            .populate('user', 'name profileImage');
        
        res.json({
            success: true,
            count: testimonials.length,
            data: testimonials
        });
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Add new testimonial (authenticated users)
exports.addTestimonial = async (req, res) => {
    try {
        const { content, rating } = req.body;
        
        // Validate input
        if (!content) {
            return res.status(400).json({
                success: false,
                message: 'Content is required'
            });
        }
        
        // Validate rating
        if (rating && (rating < 1 || rating > 5)) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }
        
        // Create new testimonial
        const testimonial = new Testimonial({
            user: req.user._id,
            content,
            rating: rating || 5,
            approved: false // Testimonials need admin approval
        });
        
        await testimonial.save();
        
        res.status(201).json({
            success: true,
            message: 'Testimonial submitted successfully and awaiting approval',
            data: testimonial
        });
    } catch (error) {
        console.error('Error adding testimonial:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update testimonial (admin only)
exports.updateTestimonial = async (req, res) => {
    try {
        const { content, rating, approved } = req.body;
        
        // Build testimonial object
        const testimonialFields = {};
        if (content) testimonialFields.content = content;
        if (rating) testimonialFields.rating = rating;
        if (approved !== undefined) testimonialFields.approved = approved;
        
        let testimonial = await Testimonial.findById(req.params.id);
        
        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }
        
        // Update testimonial
        testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { $set: testimonialFields },
            { new: true }
        );
        
        res.json({
            success: true,
            data: testimonial
        });
    } catch (error) {
        console.error('Error updating testimonial:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete testimonial (admin only)
exports.deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        
        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }
        
        await testimonial.remove();
        
        res.json({
            success: true,
            message: 'Testimonial removed'
        });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Approve testimonial (admin only)
exports.approveTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        
        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }
        
        testimonial.approved = true;
        await testimonial.save();
        
        res.json({
            success: true,
            message: 'Testimonial approved',
            data: testimonial
        });
    } catch (error) {
        console.error('Error approving testimonial:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}; 