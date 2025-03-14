const Settings = require('../models/Settings');
const cloudinary = require('../config/cloudinaryConfig');
const streamifier = require('streamifier');

// Get settings (public)
exports.getSettings = async (req, res) => {
    try {
        // Find the most recent settings
        const settings = await Settings.findOne().sort({ createdAt: -1 });
        
        if (!settings) {
            // Create default settings if none exist
            const defaultSettings = new Settings();
            await defaultSettings.save();
            
            return res.status(200).json({
                success: true,
                data: defaultSettings
            });
        }
        
        // Return found settings
        return res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        console.error('Error fetching settings:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update settings (admin only)
exports.updateSettings = async (req, res) => {
    try {
        const { 
            siteName, 
            siteDescription, 
            siteKeywords,
            email,
            phone,
            address,
            socialLinks,
            primaryColor,
            secondaryColor,
            fontFamily,
            darkMode,
            showResume,
            showProjects,
            showBlog,
            showTestimonials,
            showContact,
            googleAnalyticsId
        } = req.body;
        
        // Find the most recent settings or create new ones
        let settings = await Settings.findOne().sort({ createdAt: -1 });
        
        if (!settings) {
            settings = new Settings();
        }
        
        // Update fields if provided
        if (siteName !== undefined) settings.siteName = siteName;
        if (siteDescription !== undefined) settings.siteDescription = siteDescription;
        if (siteKeywords !== undefined) settings.siteKeywords = siteKeywords;
        if (email !== undefined) settings.email = email;
        if (phone !== undefined) settings.phone = phone;
        if (address !== undefined) settings.address = address;
        if (socialLinks !== undefined) {
            // Update only provided social links
            Object.keys(socialLinks).forEach(platform => {
                if (socialLinks[platform] !== undefined) {
                    settings.socialLinks[platform] = socialLinks[platform];
                }
            });
        }
        if (primaryColor !== undefined) settings.primaryColor = primaryColor;
        if (secondaryColor !== undefined) settings.secondaryColor = secondaryColor;
        if (fontFamily !== undefined) settings.fontFamily = fontFamily;
        if (darkMode !== undefined) settings.darkMode = darkMode;
        if (showResume !== undefined) settings.showResume = showResume;
        if (showProjects !== undefined) settings.showProjects = showProjects;
        if (showBlog !== undefined) settings.showBlog = showBlog;
        if (showTestimonials !== undefined) settings.showTestimonials = showTestimonials;
        if (showContact !== undefined) settings.showContact = showContact;
        if (googleAnalyticsId !== undefined) settings.googleAnalyticsId = googleAnalyticsId;
        
        // Save the updated settings
        await settings.save();
        
        return res.status(200).json({
            success: true,
            data: settings,
            message: 'Settings updated successfully'
        });
    } catch (error) {
        console.error('Error updating settings:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Upload logo (admin only)
exports.uploadLogo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }
        
        // Upload to cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'portfolio/settings',
                    resource_type: 'image'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            
            streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });
        
        // Find settings
        let settings = await Settings.findOne().sort({ createdAt: -1 });
        
        if (!settings) {
            settings = new Settings();
        }
        
        // Update logo URL
        settings.logo = result.secure_url;
        await settings.save();
        
        return res.status(200).json({
            success: true,
            data: {
                logo: settings.logo
            },
            message: 'Logo uploaded successfully'
        });
    } catch (error) {
        console.error('Error uploading logo:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Upload favicon (admin only)
exports.uploadFavicon = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }
        
        // Upload to cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'portfolio/settings',
                    resource_type: 'image'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            
            streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });
        
        // Find settings
        let settings = await Settings.findOne().sort({ createdAt: -1 });
        
        if (!settings) {
            settings = new Settings();
        }
        
        // Update favicon URL
        settings.favicon = result.secure_url;
        await settings.save();
        
        return res.status(200).json({
            success: true,
            data: {
                favicon: settings.favicon
            },
            message: 'Favicon uploaded successfully'
        });
    } catch (error) {
        console.error('Error uploading favicon:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Upload meta image (admin only)
exports.uploadMetaImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }
        
        // Upload to cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'portfolio/settings',
                    resource_type: 'image'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            
            streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });
        
        // Find settings
        let settings = await Settings.findOne().sort({ createdAt: -1 });
        
        if (!settings) {
            settings = new Settings();
        }
        
        // Update meta image URL
        settings.metaImage = result.secure_url;
        await settings.save();
        
        return res.status(200).json({
            success: true,
            data: {
                metaImage: settings.metaImage
            },
            message: 'Meta image uploaded successfully'
        });
    } catch (error) {
        console.error('Error uploading meta image:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}; 