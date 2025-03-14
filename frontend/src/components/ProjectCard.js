import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Chip, 
  IconButton,
  Stack,
  CardActions,
  Button
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ProjectCard = ({ project }) => {
  // Extract id from different possible formats
  const { _id, id: projectId, title, description, technologies, image, githubLink, hostLink } = project;
  const id = _id || projectId || project.id;
  
  return (
    <Card className="card-hover" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={image || '/path/to/placeholder.jpg'}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {description.length > 120 ? `${description.substring(0, 120)}...` : description}
        </Typography>
        
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
          {technologies && technologies.map((tech, index) => (
            <Chip 
              key={index} 
              label={tech} 
              size="small" 
              variant="outlined"
              sx={{ m: 0.5 }}
            />
          ))}
        </Stack>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
        <Button 
          component={RouterLink} 
          to={`/projects/${id}`} 
          state={{ projectData: project }}
          size="small" 
          endIcon={<ArrowForwardIcon />}
        >
          View Details
        </Button>
        
        <Box>
          {githubLink && (
            <IconButton 
              aria-label="GitHub Repository" 
              href={githubLink} 
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </IconButton>
          )}
          
          {hostLink && (
            <IconButton 
              aria-label="Live Demo" 
              href={hostLink} 
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              <LaunchIcon />
            </IconButton>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProjectCard; 