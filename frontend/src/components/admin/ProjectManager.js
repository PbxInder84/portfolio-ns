import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Stack
} from '@mui/material';
import { Add as AddIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import DataTable from '../DataTable';
import GitHubImportDialog from './GitHubImportDialog';
import api from '../../services/api';
import LoadingSpinner from '../LoadingSpinner';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    liveDemoLink: ''
  });
  const [githubDialogOpen, setGithubDialogOpen] = useState(false);

  const columns = [
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description' },
    { 
      id: 'technologies', 
      label: 'Technologies',
      format: (technologies) => technologies.join(', ')
    }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (project = null) => {
    if (project) {
      setCurrentProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        technologies: project.technologies.join(', '),
        githubLink: project.githubLink || '',
        liveDemoLink: project.liveDemoLink || ''
      });
    } else {
      setCurrentProject(null);
      setFormData({
        title: '',
        description: '',
        technologies: '',
        githubLink: '',
        liveDemoLink: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProject(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim())
      };

      if (currentProject) {
        await api.put(`/projects/${currentProject._id}`, projectData);
      } else {
        await api.post('/projects', projectData);
      }
      
      fetchProjects();
      handleClose();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleGitHubImport = async (projectsToImport) => {
    try {
      await Promise.all(
        projectsToImport.map(project => api.post('/projects', project))
      );
      fetchProjects();
    } catch (error) {
      console.error('Error importing projects:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Project
        </Button>
        <Button
          variant="outlined"
          startIcon={<GitHubIcon />}
          onClick={() => setGithubDialogOpen(true)}
        >
          Import from GitHub
        </Button>
      </Stack>

      <DataTable
        data={projects}
        columns={columns}
        onEdit={handleOpen}
        onDelete={handleDelete}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentProject ? 'Edit Project' : 'Add New Project'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <TextField
              fullWidth
              label="Technologies (comma-separated)"
              name="technologies"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="GitHub Link"
              name="githubLink"
              value={formData.githubLink}
              onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Live Demo Link"
              name="liveDemoLink"
              value={formData.liveDemoLink}
              onChange={(e) => setFormData({ ...formData, liveDemoLink: e.target.value })}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {currentProject ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <GitHubImportDialog
        open={githubDialogOpen}
        onClose={() => setGithubDialogOpen(false)}
        onImport={handleGitHubImport}
      />
    </Box>
  );
};

export default ProjectManager; 