const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/authMiddleware');
const projectController = require('../controllers/projectController');
const upload = require('../config/multerConfig');
const Project = require('../models/Project');
const cloudinary = require('cloudinary').v2;

// Public routes
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.get('/:id/download', auth, projectController.downloadProject);

// Admin routes - require authentication and admin role
router.post('/', auth, adminOnly, projectController.createProject);
router.put('/:id', auth, adminOnly, projectController.updateProject);
router.delete('/:id', auth, adminOnly, projectController.deleteProject);
router.post('/:id/image', auth, adminOnly, projectController.uploadProjectImage);

// Delete a project and its image
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete image from Cloudinary
    if (project.imageUrl) {
      const publicId = project.imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await project.remove();
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project' });
  }
});

// Add a new project with image upload
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { title, description, technologies, hostLink, githubLink } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const newProject = new Project({
      title,
      description,
      technologies: technologies.split(',').map(tech => tech.trim()),
      imageUrl,
      hostLink,
      githubLink
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ message: 'Error adding project' });
  }
});

module.exports = router; 