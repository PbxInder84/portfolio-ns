import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Container, Grid, Avatar, Chip, Stack } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

function AboutSection() {
  const skills = [
    'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 
    'HTML/CSS', 'Material UI', 'Git', 'REST API', 'GraphQL'
  ];

  return (
    <Box component="section" className="section-alt" id="about">
      <Container>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          About Me
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                src="/path/to/your/profile.jpg"
                alt="Profile Image"
                sx={{ 
                  width: 280, 
                  height: 280,
                  boxShadow: 3,
                  border: '4px solid white'
                }}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Typography variant="h5" gutterBottom>
              Hello, I'm <Box component="span" sx={{ color: 'primary.main' }}>Your Name</Box>
            </Typography>
            
            <Typography variant="body1" paragraph>
              I'm a passionate full-stack developer with expertise in building modern web applications.
              With a strong foundation in both frontend and backend technologies, I create seamless
              user experiences backed by robust server architectures.
            </Typography>
            
            <Typography variant="body1" paragraph>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source
              projects, or enjoying outdoor activities.
            </Typography>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              My Skills
            </Typography>
            
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
              {skills.map((skill) => (
                <Chip 
                  key={skill} 
                  label={skill} 
                  variant="outlined" 
                  color="primary"
                  sx={{ m: 0.5 }}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
        
        <Grid container spacing={3} sx={{ mt: 6 }}>
          {[
            { icon: <CodeIcon fontSize="large" />, title: 'Frontend Development', description: 'Creating responsive and intuitive user interfaces with modern frameworks' },
            { icon: <StorageIcon fontSize="large" />, title: 'Backend Development', description: 'Building scalable APIs and server-side applications' },
            { icon: <DesignServicesIcon fontSize="large" />, title: 'UI/UX Design', description: 'Designing user-friendly experiences with attention to detail' }
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className="card-hover" sx={{ height: '100%', p: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
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
}

export default AboutSection; 