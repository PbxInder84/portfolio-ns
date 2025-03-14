import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Avatar
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

const EducationSection = () => {
  const timelineItems = [
    {
      id: 1,
      type: 'education',
      year: '2018 - 2022',
      title: 'Bachelor of Science in Computer Science',
      institution: 'University Name',
      description: 'Graduated with honors. Focused on web development, algorithms, and database systems.'
    },
    {
      id: 2,
      type: 'work',
      year: '2022 - Present',
      title: 'Full Stack Developer',
      institution: 'Company Name',
      description: 'Developing and maintaining web applications using React, Node.js, and MongoDB.'
    },
    {
      id: 3,
      type: 'education',
      year: '2022',
      title: 'Advanced Web Development Certification',
      institution: 'Online Learning Platform',
      description: 'Completed advanced courses in modern web development technologies and practices.'
    },
    {
      id: 4,
      type: 'work',
      year: '2020 - 2022',
      title: 'Frontend Developer Intern',
      institution: 'Startup Name',
      description: 'Assisted in developing user interfaces and implementing responsive designs.'
    }
  ];

  return (
    <Box component="section" className="section" id="education" sx={{ backgroundColor: 'background.default' }}>
      <Container>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          Education & Experience
        </Typography>
        
        <Grid container spacing={4}>
          {timelineItems.map((item, index) => (
            <Grid item xs={12} md={6} key={item.id}>
              <Card className="card-hover" sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: -20, 
                    left: 20, 
                    zIndex: 1 
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: item.type === 'education' ? 'primary.main' : 'secondary.main',
                      width: 50,
                      height: 50,
                      boxShadow: 2
                    }}
                  >
                    {item.type === 'education' ? <SchoolIcon /> : <WorkIcon />}
                  </Avatar>
                </Box>
                
                <CardContent sx={{ pt: 4, mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h3">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                      {item.year}
                    </Typography>
                  </Box>
                  
                  <Typography variant="subtitle1" color="primary.main" gutterBottom>
                    {item.institution}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default EducationSection; 