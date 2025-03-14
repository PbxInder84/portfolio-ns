import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Grid, 
  Divider, 
  Chip, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Card,
  CardContent,
  useTheme,
  LinearProgress,
  Alert,
  Badge
} from '@mui/material';
import { 
  Download as DownloadIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useSettings } from '../context/SettingsContext';

const Resume = () => {
  const theme = useTheme();
  const { settings } = useSettings();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = () => {
    window.open(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/resume/download`, '_blank');
  };

  // Define resume data directly since the API endpoint is not available
  const resumeData = {
    experienceLevel: 'Fresher', // Changed to 'Fresher'
    yearsOfExperience: 0, // Changed to 0
    education: [
      {
        institution: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2019-09-01',
        endDate: '2023-05-30',
        location: 'New York, NY',
        description: 'Graduated with honors. Focused on software engineering and web development.'
      }
    ],
    // Empty experience array for a fresher
    experience: [],
    skills: [
      { name: 'JavaScript', level: 85 },
      { name: 'React', level: 80 },
      { name: 'Node.js', level: 75 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Git', level: 80 },
      { name: 'MongoDB', level: 70 }
    ],
    certifications: [
      'Web Development Bootcamp',
      'React Certification',
      'JavaScript Algorithms and Data Structures'
    ],
    languages: ['English (Native)', 'Spanish (Basic)'],
    summary: 'Recent Computer Science graduate with a strong foundation in web development technologies. Passionate about creating efficient, user-friendly applications and eager to apply my skills in a professional environment.'
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <Box 
      sx={{ 
        py: 8,
        position: 'relative',
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
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '5px', 
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})` 
            }} 
          />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                  Professional Resume
                </Typography>
                <Chip 
                  icon={<StarIcon />} 
                  label="Fresher"
                  color="info"
                  sx={{ 
                    fontWeight: 'bold',
                    borderRadius: '16px',
                    height: '28px'
                  }}
                />
              </Box>
              <Typography variant="body1" paragraph color="text.secondary">
                {resumeData.summary}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, alignItems: 'center' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
                sx={{ 
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: 'none',
                  }
                }}
              >
                Download Resume
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={4}>
          {/* Education Section */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[2]
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <SchoolIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                  <Typography variant="h5" component="h2">
                    Education
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                {resumeData.education.map((edu, index) => (
                  <Box key={index} sx={{ mb: index < resumeData.education.length - 1 ? 4 : 0 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {edu.institution}
                    </Typography>
                    <Typography variant="subtitle1" color="primary.main" gutterBottom>
                      {edu.degree} in {edu.field}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {edu.location}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {edu.description}
                    </Typography>
                    
                    {index < resumeData.education.length - 1 && (
                      <Divider sx={{ my: 2 }} />
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
          
          {/* Experience Section - Modified for Fresher */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[2]
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <WorkIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                  <Typography variant="h5" component="h2">
                    Experience
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  py: 4,
                  px: 2,
                  textAlign: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: 2
                }}>
                  <InfoIcon color="info" sx={{ fontSize: 48, mb: 2, opacity: 0.7 }} />
                  <Typography variant="h6" gutterBottom>
                    Fresh Graduate
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    I am a recent graduate eager to apply my academic knowledge in a professional setting. While I don't have formal work experience yet, I've developed strong skills through academic projects and personal initiatives.
                  </Typography>
                  <Chip 
                    label="Ready for New Opportunities" 
                    color="primary" 
                    variant="outlined" 
                    sx={{ mt: 1 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Skills Section */}
          <Grid item xs={12}>
            <Card 
              sx={{ 
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[2]
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <CodeIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                  <Typography variant="h5" component="h2">
                    Skills
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={3}>
                  {resumeData.skills.map((skill, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body1">{skill.name}</Typography>
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
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Certifications & Languages */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[2]
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <CheckCircleIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                  <Typography variant="h5" component="h2">
                    Certifications
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                <List>
                  {resumeData.certifications.map((cert, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={cert} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[2]
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Languages
                </Typography>
                
                <Divider sx={{ mb: 3 }} />
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {resumeData.languages.map((language, index) => (
                    <Chip 
                      key={index} 
                      label={language} 
                      color="primary" 
                      variant="outlined" 
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Resume; 