const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

// Get all projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get single project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        
        res.json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Create new project
exports.createProject = async (req, res) => {
    try {
        const { 
            title, 
            description, 
            technologies, 
            githubLink, 
            demoLink,
            category,
            features,
            longDescription,
            technicalDetails
        } = req.body;
        
        // Validate required fields
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'Title and description are required fields'
            });
        }
        
        const project = new Project({
            title,
            description,
            technologies: technologies || [],
            githubLink,
            demoLink,
            category,
            features: features || [],
            longDescription,
            technicalDetails
        });
        
        await project.save();
        
        res.status(201).json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// Update project
exports.updateProject = async (req, res) => {
    try {
        const { 
            title, 
            description, 
            technologies, 
            githubLink, 
            demoLink,
            category,
            features,
            longDescription,
            technicalDetails
        } = req.body;
        
        // Build project object
        const projectFields = {};
        if (title) projectFields.title = title;
        if (description) projectFields.description = description;
        if (technologies) projectFields.technologies = technologies;
        if (githubLink) projectFields.githubLink = githubLink;
        if (demoLink) projectFields.demoLink = demoLink;
        if (category) projectFields.category = category;
        if (features) projectFields.features = features;
        if (longDescription) projectFields.longDescription = longDescription;
        if (technicalDetails) projectFields.technicalDetails = technicalDetails;
        
        let project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        
        // Update project
        project = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: projectFields },
            { new: true }
        );
        
        res.json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        
        await project.remove();
        
        res.json({
            success: true,
            message: 'Project removed'
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Download project
exports.downloadProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        
        // In a real app, you would have logic to generate or retrieve the project files
        // For now, we'll just send a placeholder file or message
        
        res.json({
            success: true,
            message: 'Download functionality will be implemented soon'
        });
        
        // Example of how you might send a file:
        // const filePath = path.join(__dirname, '../uploads/projects', `${project._id}.zip`);
        // res.download(filePath, `${project.title}.zip`);
    } catch (error) {
        console.error('Error downloading project:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Upload project image
exports.uploadProjectImage = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an image'
            });
        }
        
        // In a real app, you would process the uploaded file
        // For now, we'll just update the project with a placeholder image URL
        
        project.image = `/uploads/projects/${req.file.filename}`;
        await project.save();
        
        res.json({
            success: true,
            data: {
                image: project.image
            }
        });
    } catch (error) {
        console.error('Error uploading project image:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}; 