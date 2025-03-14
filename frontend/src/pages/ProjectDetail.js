import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Chip, 
  Button, 
  Divider, 
  CircularProgress, 
  Alert,
  Card,
  CardContent,
  useTheme,
  Link
} from '@mui/material';
import { useParams, Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CodeIcon from '@mui/icons-material/Code';
import { getProjectById, downloadProject, getProjects } from '../services/api';
import { useAuth } from '../context/AuthContext';

const createMockProjectData = (id) => {
  return {
    id,
    title: "Project Details",
    description: "This is a placeholder for project details. The actual project data could not be loaded from the server.",
    longDescription: "This project information is currently unavailable. This could be because the backend API is still in development or the project has been temporarily removed. Please check back later or contact the administrator for more information.",
    image: "/path/to/placeholder.jpg",
    technologies: ["React", "Material UI", "Node.js"],
    githubLink: "#",
    hostLink: "#",
    features: [
      {
        title: "Feature 1",
        description: "Placeholder feature description"
      },
      {
        title: "Feature 2",
        description: "Placeholder feature description"
      }
    ],
    technicalDetails: "Technical details are not available at this time.",
    relatedProjects: []
  };
};

const ProjectDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const projectFromState = location.state?.projectData;

  useEffect(() => {
    const fetchProject = async () => {
      if (projectFromState) {
        setProject(projectFromState);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Try to get the project by ID from the API
        try {
          const response = await getProjectById(id);
          
          // Handle different response structures
          const projectData = response.data.data || response.data;
          
          if (!projectData) {
            throw new Error('Project not found');
          }
          
          setProject(projectData);
          setError(null);
        } catch (apiError) {
          console.error('API Error:', apiError);
          
          // If the API endpoint is not implemented or returns 404,
          // try to get all projects and find the one with matching ID
          const allProjectsResponse = await getProjects();
          const allProjects = allProjectsResponse.data.data || allProjectsResponse.data || [];
          
          // Find the project with matching ID
          const foundProject = allProjects.find(p => 
            (p._id === id || p.id === id)
          );
          
          if (foundProject) {
            setProject(foundProject);
            setError(null);
          } else {
            // Create mock data as a last resort
            const mockProject = createMockProjectData(id);
            setProject(mockProject);
            setError("Note: Displaying placeholder data. The actual project details could not be loaded from the server.");
          }
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDownload = async () => {
    if (!isAuthenticated) {
      setDownloadError('Please login to download this project');
      return;
    }

    try {
      setDownloadLoading(true);
      setDownloadError(null);
      await downloadProject(id);
      setDownloadSuccess(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error downloading project:', err);
      setDownloadError('Failed to download project. Please try again later.');
    } finally {
      setDownloadLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Button 
          component={RouterLink} 
          to="/projects" 
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to Projects
        </Button>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="info" sx={{ mb: 4 }}>
          Project not found
        </Alert>
        <Button 
          component={RouterLink} 
          to="/projects" 
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to Projects
        </Button>
      </Container>
    );
  }

  return (
    <Box 
      component="section" 
      sx={{ 
        py: 10,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 80% 20%, ${theme.palette.primary.main}15, transparent 40%)`,
          zIndex: -1
        }
      }}
    >
      <Container maxWidth="lg">
        <Button 
          component={RouterLink} 
          to="/projects" 
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 4 }}
        >
          Back to Projects
        </Button>

        <Grid container spacing={6}>
          {/* Project Image */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                borderRadius: 2,
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2
              }}
            >
              <Box 
                component="img"
                src={project.image || '/path/to/placeholder.jpg'}
                alt={project.title}
                sx={{ 
                  width: '100%',
                  height: 'auto',
                  maxHeight: 400,
                  objectFit: 'contain',
                  borderRadius: 1
                }}
              />
            </Paper>
          </Grid>

          {/* Project Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {project.title}
            </Typography>

            <Box sx={{ mb: 3 }}>
              {project.technologies && project.technologies.map((tech, index) => (
                <Chip 
                  key={index} 
                  label={tech} 
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>

            <Typography variant="body1" paragraph>
              {project.description}
            </Typography>

            <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {project.githubLink && (
                <Button 
                  variant="outlined" 
                  startIcon={<GitHubIcon />}
                  component={Link}
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repo
                </Button>
              )}
              
              {project.hostLink && (
                <Button 
                  variant="outlined" 
                  startIcon={<LaunchIcon />}
                  component={Link}
                  href={project.hostLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </Button>
              )}
              
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
                disabled={downloadLoading}
              >
                {downloadLoading ? 'Downloading...' : 'Download Source Code'}
              </Button>
            </Box>

            {!isAuthenticated && (
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Please <Link component={RouterLink} to="/login">login</Link> or <Link component={RouterLink} to="/register">register</Link> to download the source code.
                </Typography>
              </Alert>
            )}

            {downloadError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {downloadError}
              </Alert>
            )}

            {downloadSuccess && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Download started successfully!
              </Alert>
            )}
          </Grid>
        </Grid>

        {/* Project Features */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Features
          </Typography>
          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={3}>
            {project.features && project.features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 10px 20px -10px ${theme.palette.primary.main}40`,
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CodeIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" component="h3">
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Technical Details */}
        {project.technicalDetails && (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Technical Details
            </Typography>
            <Divider sx={{ mb: 4 }} />
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="body1" component="div">
                {project.technicalDetails}
              </Typography>
            </Paper>
          </Box>
        )}

        {/* Related Projects */}
        {project.relatedProjects && project.relatedProjects.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Related Projects
            </Typography>
            <Divider sx={{ mb: 4 }} />
            
            <Grid container spacing={3}>
              {project.relatedProjects.map((relatedProject, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    component={RouterLink}
                    to={`/projects/${relatedProject.id}`}
                    sx={{ 
                      height: '100%',
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      textDecoration: 'none',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 10px 20px -10px ${theme.palette.primary.main}40`,
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        height: 140,
                        overflow: 'hidden'
                      }}
                    >
                      <Box 
                        component="img"
                        src={relatedProject.image || '/path/to/placeholder.jpg'}
                        alt={relatedProject.title}
                        sx={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="h6" component="h3" color="text.primary">
                        {relatedProject.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {relatedProject.shortDescription}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProjectDetail; 