import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  LinearProgress, 
  Paper,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import LanguageIcon from '@mui/icons-material/Language';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <CodeIcon fontSize="large" />,
      skills: [
        { name: 'HTML/CSS', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'React', level: 80 },
        { name: 'Material UI', level: 75 },
        { name: 'Responsive Design', level: 85 }
      ]
    },
    {
      title: 'Backend Development',
      icon: <StorageIcon fontSize="large" />,
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Express', level: 75 },
        { name: 'MongoDB', level: 70 },
        { name: 'RESTful APIs', level: 85 },
        { name: 'Authentication', level: 75 }
      ]
    },
    {
      title: 'Other Skills',
      icon: <LanguageIcon fontSize="large" />,
      skills: [
        { name: 'Git/GitHub', level: 80 },
        { name: 'Testing', level: 65 },
        { name: 'Deployment', level: 70 },
        { name: 'Performance Optimization', level: 65 },
        { name: 'SEO Basics', level: 60 }
      ]
    }
  ];

  return (
    <Box component="section" className="section" id="skills">
      <Container>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          My Skills
        </Typography>
        
        <Grid container spacing={4}>
          {skillCategories.map((category, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className="card-hover" sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {category.icon}
                    </Avatar>
                    <Typography variant="h6">{category.title}</Typography>
                  </Box>
                  
                  <Box>
                    {category.skills.map((skill, idx) => (
                      <Box key={idx} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2">{skill.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{skill.level}%</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={skill.level} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4
                            }
                          }} 
                        />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SkillsSection; 