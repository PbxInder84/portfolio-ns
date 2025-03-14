import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button,
  Tabs,
  Tab,
  CircularProgress
} from '@mui/material';
import ProjectCard from './ProjectCard';

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);
  
  // Sample projects data - in a real app, you'd fetch this from your API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const sampleProjects = [
        {
          id: 1,
          title: 'E-Commerce Platform',
          description: 'A full-stack e-commerce application with product management, cart functionality, and payment processing.',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
          image: '/path/to/ecommerce.jpg',
          githubLink: 'https://github.com/yourusername/ecommerce',
          hostLink: 'https://ecommerce-demo.com',
          category: 'fullstack'
        },
        {
          id: 2,
          title: 'Weather Dashboard',
          description: 'A weather application that displays current and forecasted weather data for cities around the world.',
          technologies: ['React', 'OpenWeather API', 'Chart.js', 'CSS'],
          image: '/path/to/weather.jpg',
          githubLink: 'https://github.com/yourusername/weather-app',
          hostLink: 'https://weather-dashboard-demo.com',
          category: 'frontend'
        },
        {
          id: 3,
          title: 'Task Management API',
          description: 'RESTful API for task management with authentication, task CRUD operations, and team collaboration features.',
          technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
          image: '/path/to/task-api.jpg',
          githubLink: 'https://github.com/yourusername/task-api',
          category: 'backend'
        },
        {
          id: 4,
          title: 'Portfolio Website',
          description: 'A personal portfolio website showcasing projects and skills (this website).',
          technologies: ['React', 'Material UI', 'CSS', 'Responsive Design'],
          image: '/path/to/portfolio.jpg',
          githubLink: 'https://github.com/yourusername/portfolio',
          hostLink: 'https://yourportfolio.com',
          category: 'frontend'
        }
      ];
      
      setProjects(sampleProjects);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
  };
  
  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.category === filter;
  });
  
  return (
    <Box component="section" className="section-alt" id="projects">
      <Container>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 1 }}>
          My Projects
        </Typography>
        
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
          Here are some of my recent projects. Each one was carefully crafted to solve specific problems and showcase different skills.
        </Typography>
        
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Tabs 
            value={filter} 
            onChange={handleFilterChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="project category tabs"
          >
            <Tab value="all" label="All Projects" />
            <Tab value="frontend" label="Frontend" />
            <Tab value="backend" label="Backend" />
            <Tab value="fullstack" label="Full Stack" />
          </Tabs>
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        )}
        
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            href="/projects"
          >
            View All Projects
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectSection; 