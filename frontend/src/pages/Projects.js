import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  Chip, 
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  useTheme,
  Tabs,
  Tab
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../services/api';

const Projects = () => {
  const theme = useTheme();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getProjects();
        
        // Check if the response has the expected structure
        const projectsData = response.data.data || response.data || [];
        
        setProjects(projectsData);
        setFilteredProjects(projectsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Filter projects based on search term and category
    let result = projects;
    
    if (searchTerm) {
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.technologies && project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }
    
    if (filter !== 'all') {
      result = result.filter(project => project.category === filter);
    }
    
    setFilteredProjects(result);
  }, [searchTerm, filter, projects]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
  };

  // Extract unique categories from projects
  const categories = ['all', ...new Set(projects.map(project => project.category).filter(Boolean))];

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
          background: `radial-gradient(circle at 20% 80%, ${theme.palette.primary.main}15, transparent 40%)`,
          zIndex: -1
        }
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Projects
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph sx={{ mb: 5 }}>
          Explore my latest work and personal projects
        </Typography>
        
        {/* Search and Filter */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search projects..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Tabs 
                  value={filter} 
                  onChange={handleFilterChange}
                  textColor="primary"
                  indicatorColor="primary"
                  aria-label="project category tabs"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {categories.map((category) => (
                    <Tab 
                      key={category} 
                      value={category} 
                      label={category === 'all' ? 'All Projects' : category}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  ))}
                </Tabs>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : filteredProjects.length === 0 ? (
          <Alert severity="info" sx={{ mb: 4 }}>
            No projects found matching your criteria.
          </Alert>
        ) : (
          <Grid container spacing={4}>
            {filteredProjects.map((project) => {
              // Extract id from different possible formats
              const id = project._id || project.id;
              
              return (
                <Grid item xs={12} sm={6} md={4} key={id}>
                  <ProjectCard project={{
                    id,
                    title: project.title,
                    description: project.description,
                    technologies: project.technologies || [],
                    image: project.image || (project.images && project.images[0]),
                    githubLink: project.githubLink || project.github,
                    hostLink: project.demoLink || project.liveLink || project.demo
                  }} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Projects; 