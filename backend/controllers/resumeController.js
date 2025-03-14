const multer = require('multer');
const path = require('path');
const Resume = require('../models/Resume');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/resumes');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const uploadResume = (req, res) => {
    res.status(201).json({ message: "Resume uploaded successfully.", file: req.file });
};

const getResume = (req, res) => {
    res.download(`uploads/resumes/${req.params.filename}`);
};

// Get resume (public)
const getResumeData = async (req, res) => {
    try {
        // Find the most recent resume
        const resume = await Resume.findOne().sort({ createdAt: -1 });
        
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }
        
        res.json({
            success: true,
            data: resume
        });
    } catch (error) {
        console.error('Error fetching resume:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Download resume (public)
const downloadResumeFile = async (req, res) => {
    try {
        // Find the most recent resume
        const resume = await Resume.findOne().sort({ createdAt: -1 });
        
        if (!resume || !resume.filePath) {
            return res.status(404).json({
                success: false,
                message: 'Resume file not found'
            });
        }
        
        const filePath = path.join(__dirname, '..', resume.filePath);
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: 'Resume file not found on server'
            });
        }
        
        // Set headers for file download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=resume.pdf`);
        
        // Stream the file
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error('Error downloading resume:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update resume (admin only)
const updateResumeData = async (req, res) => {
    try {
        const { 
            education, 
            experience, 
            skills, 
            projects,
            certifications,
            languages,
            interests,
            summary
        } = req.body;
        
        // Find the most recent resume or create a new one
        let resume = await Resume.findOne().sort({ createdAt: -1 });
        
        if (!resume) {
            resume = new Resume({});
        }
        
        // Update fields
        if (education) resume.education = education;
        if (experience) resume.experience = experience;
        if (skills) resume.skills = skills;
        if (projects) resume.projects = projects;
        if (certifications) resume.certifications = certifications;
        if (languages) resume.languages = languages;
        if (interests) resume.interests = interests;
        if (summary) resume.summary = summary;
        
        // Save the updated resume
        await resume.save();
        
        res.json({
            success: true,
            data: resume
        });
    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Upload resume file (admin only)
const uploadResumeFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a file'
            });
        }
        
        // Find the most recent resume or create a new one
        let resume = await Resume.findOne().sort({ createdAt: -1 });
        
        if (!resume) {
            resume = new Resume({});
        }
        
        // Update file path
        resume.filePath = `uploads/resume/${req.file.filename}`;
        resume.fileName = req.file.originalname;
        resume.fileType = req.file.mimetype;
        resume.fileSize = req.file.size;
        
        // Save the updated resume
        await resume.save();
        
        res.json({
            success: true,
            data: {
                filePath: resume.filePath,
                fileName: resume.fileName
            }
        });
    } catch (error) {
        console.error('Error uploading resume file:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = { 
    upload, 
    uploadResume, 
    getResume: getResumeData, 
    downloadResume: downloadResumeFile, 
    updateResume: updateResumeData, 
    uploadResumeFile 
}; 