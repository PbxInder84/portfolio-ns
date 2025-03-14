import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  CircularProgress,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getProjects, deleteProject } from '../../services/api';
import DataTable from '../../components/DataTable';
import ProjectForm from '../../components/admin/ProjectForm';
import ConfirmDialog from '../../components/ConfirmDialog';
import { useNavigate } from 'react-router-dom';

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getProjects();
      // Make sure we're getting an array from the API
      const projectsData = response.data.data || response.data || [];
      setProjects(Array.isArray(projectsData) ? projectsData : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again.');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = () => {
    setCurrentProject(null);
    setOpenForm(true);
  };

  const handleEditProject = (project) => {
    setCurrentProject(project);
    setOpenForm(true);
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
      await deleteProject(projectToDelete.id || projectToDelete._id);
      setProjects(projects.filter(p => 
        (p.id || p._id) !== (projectToDelete.id || projectToDelete._id)
      ));
      setOpenConfirm(false);
      setProjectToDelete(null);
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project. Please try again.');
    }
  };

  const handleFormClose = (refreshData) => {
    setOpenForm(false);
    if (refreshData) {
      fetchProjects();
    }
  };

  const columns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 200,
      format: (value) => value.length > 100 ? `${value.substring(0, 100)}...` : value
    },
    { id: 'technologies', label: 'Technologies', minWidth: 150,
      format: (value) => Array.isArray(value) ? value.join(', ') : value
    },
    { id: 'createdAt', label: 'Created', minWidth: 120,
      format: (value) => value ? new Date(value).toLocaleDateString() : 'N/A'
    }
  ];

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

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <DataTable 
        data={projects}
        columns={columns}
        onEdit={handleEditProject}
        onDelete={handleDeleteClick}
        onView={handleViewProject}
        loading={loading}
        error={error}
      />

      {openForm && (
        <ProjectForm 
          open={openForm} 
          onClose={handleFormClose} 
          project={currentProject}
        />
      )}

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
    </Container>
  );
};

export default ProjectsAdmin; 