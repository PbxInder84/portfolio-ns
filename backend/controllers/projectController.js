const Project = require('../models/Project');

const getProjects = async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
};

const addProject = async (req, res) => {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
};

const updateProject = async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
};

const deleteProject = async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully." });
};

module.exports = { getProjects, addProject, updateProject, deleteProject }; 