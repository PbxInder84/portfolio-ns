import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  Container,
  CircularProgress,
  Alert
} from '@mui/material';
import { Add as AddIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import DataTable from '../DataTable';
import GitHubImportDialog from './GitHubImportDialog';
import api from '../../services/api';
import LoadingSpinner from '../LoadingSpinner';
import ProjectForm from './ProjectForm';
import ConfirmDialog from '../ConfirmDialog';
import { useNavigate } from 'react-router-dom';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [githubDialogOpen, setGithubDialogOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const navigate = useNavigate();

  const columns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 200,
      format: (value) => value?.length > 100 ? `${value.substring(0, 100)}...` : value
    },
    { id: 'technologies', label: 'Technologies', minWidth: 150,
      format: (value) => Array.isArray(value) ? value.join(', ') : value
    },
    { id: 'createdAt', label: 'Created', minWidth: 120,
      format: (value) => value ? new Date(value).toLocaleDateString() : 'N/A'
    }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/projects');
      const projectsData = response.data.data || response.data || [];
      setProjects(Array.isArray(projectsData) ? projectsData : []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (project = null) => {
    setCurrentProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProject(null);
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

  const handleAddProject = () => {
    setCurrentProject(null);
    setOpen(true);
  };

  const handleEditProject = (project) => {
    setCurrentProject(project);
    setOpen(true);
  };

  const handleViewProject = (project) => {
    navigate(`/projects/${project.id || project._id}`);
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setOpenConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    
    try {
      await api.delete(`/projects/${projectToDelete.id || projectToDelete._id}`);
      fetchProjects();
      setOpenConfirm(false);
      setProjectToDelete(null);
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const handleFormClose = (refreshData) => {
    setOpen(false);
    if (refreshData) {
      fetchProjects();
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Manage Projects
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddProject}
        >
          Add Project
        </Button>
      </Box>

      <DataTable
        data={projects}
        columns={columns}
        onEdit={handleEditProject}
        onDelete={handleDeleteClick}
        onView={handleViewProject}
        loading={loading}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentProject ? 'Edit Project' : 'Add New Project'}
        </DialogTitle>
        <DialogContent>
          <ProjectForm
            currentProject={currentProject}
            onClose={handleFormClose}
            fetchProjects={fetchProjects}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <GitHubImportDialog
        open={githubDialogOpen}
        onClose={() => setGithubDialogOpen(false)}
        onImport={handleGitHubImport}
      />

      {openConfirm && (
        <ConfirmDialog
          open={openConfirm}
          title="Delete Project"
          content="Are you sure you want to delete this project? This action cannot be undone."
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setOpenConfirm(false);
            setProjectToDelete(null);
          }}
        />
      )}
    </Container>
  );
};

export default ProjectManager; 