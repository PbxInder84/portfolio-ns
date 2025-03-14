import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import ArticleIcon from '@mui/icons-material/Article';
import EmailIcon from '@mui/icons-material/Email';

const DashboardHome = () => {
  const theme = useTheme();
  
  const stats = [
    { title: 'Profile Views', value: '1,234', icon: <PersonIcon fontSize="large" color="primary" /> },
    { title: 'Projects', value: '12', icon: <CodeIcon fontSize="large" color="primary" /> },
    { title: 'Blog Posts', value: '8', icon: <ArticleIcon fontSize="large" color="primary" /> },
    { title: 'Messages', value: '24', icon: <EmailIcon fontSize="large" color="primary" /> },
  ];
  
  const recentActivities = [
    { type: 'Project', action: 'Updated', name: 'E-commerce Platform', time: '2 hours ago' },
    { type: 'Blog', action: 'Published', name: 'Getting Started with React', time: '1 day ago' },
    { type: 'Education', action: 'Added', name: 'Master\'s Degree', time: '3 days ago' },
    { type: 'Experience', action: 'Updated', name: 'Senior Developer at Tech Co', time: '1 week ago' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ 
        fontWeight: 'bold',
        color: theme.palette.primary.main,
        mb: 4
      }}>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                height: '100%',
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: `0 10px 20px -10px ${theme.palette.primary.main}40`,
                  borderColor: theme.palette.primary.main,
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </Box>
                {stat.icon}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0} 
            sx={{ 
              height: '100%',
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardHeader title="Recent Activities" />
            <Divider />
            <CardContent>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={`${activity.action} ${activity.type}: ${activity.name}`}
                        secondary={activity.time}
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0} 
            sx={{ 
              height: '100%',
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardHeader title="Quick Actions" />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        backgroundColor: `${theme.palette.primary.main}10`,
                        borderColor: theme.palette.primary.main,
                      }
                    }}
                  >
                    <PersonIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1">Update Profile</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        backgroundColor: `${theme.palette.primary.main}10`,
                        borderColor: theme.palette.primary.main,
                      }
                    }}
                  >
                    <CodeIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1">Add Project</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        backgroundColor: `${theme.palette.primary.main}10`,
                        borderColor: theme.palette.primary.main,
                      }
                    }}
                  >
                    <ArticleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1">Write Blog Post</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        backgroundColor: `${theme.palette.primary.main}10`,
                        borderColor: theme.palette.primary.main,
                      }
                    }}
                  >
                    <WorkIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1">Add Experience</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome; 