const SocialLink = require('../models/SocialLink');

// Get social links (public)
exports.getSocialLinks = async (req, res) => {
    try {
        // Find the most recent social links
        const socialLinks = await SocialLink.findOne().sort({ createdAt: -1 });
        
        if (!socialLinks) {
            return res.json({
                success: true,
                data: {
                    github: '',
                    linkedin: '',
                    twitter: '',
                    facebook: '',
                    instagram: '',
                    youtube: '',
                    website: ''
                }
            });
        }
        
        res.json({
            success: true,
            data: socialLinks
        });
    } catch (error) {
        console.error('Error fetching social links:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update social links (admin only)
exports.updateSocialLinks = async (req, res) => {
    try {
        const { 
            github, 
            linkedin, 
            twitter, 
            facebook,
            instagram,
            youtube,
            website
        } = req.body;
        
        // Find the most recent social links or create new ones
        let socialLinks = await SocialLink.findOne().sort({ createdAt: -1 });
        
        if (!socialLinks) {
            socialLinks = new SocialLink({});
        }
        
        // Update fields
        if (github !== undefined) socialLinks.github = github;
        if (linkedin !== undefined) socialLinks.linkedin = linkedin;
        if (twitter !== undefined) socialLinks.twitter = twitter;
        if (facebook !== undefined) socialLinks.facebook = facebook;
        if (instagram !== undefined) socialLinks.instagram = instagram;
        if (youtube !== undefined) socialLinks.youtube = youtube;
        if (website !== undefined) socialLinks.website = website;
        
        // Save the updated social links
        await socialLinks.save();
        
        res.json({
            success: true,
            data: socialLinks
        });
    } catch (error) {
        console.error('Error updating social links:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}; 