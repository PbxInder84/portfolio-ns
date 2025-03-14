import React from 'react';
import { Box, Container, Typography, Button, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

const NotFound = () => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 70% 30%, ${theme.palette.primary.main}15, transparent 40%)`,
          zIndex: -1
        }
      }}
    >
      <Container maxWidth="md">
        <Box 
          sx={{ 
            textAlign: 'center',
            p: 5,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 10px 30px -15px rgba(2, 12, 27, 0.7)' 
              : '0 10px 30px -15px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontSize: { xs: '6rem', md: '10rem' },
              fontWeight: 700,
              color: theme.palette.primary.main,
              textShadow: `0 0 10px ${theme.palette.primary.main}40`,
              mb: 2,
              position: 'relative',
              '&::after': {
                content: '"404"',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                color: 'transparent',
                textShadow: 'none',
                animation: 'glitch 1s linear infinite',
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                opacity: 0.8
              }
            }}
          >
            404
          </Typography>
          
          <Typography variant="h4" component="p" gutterBottom>
            Page Not Found
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              component={RouterLink} 
              to="/" 
              variant="contained" 
              color="primary"
              startIcon={<HomeIcon />}
              sx={{ borderRadius: 2 }}
            >
              Return to Home
            </Button>
            
            <Button 
              component={RouterLink} 
              to="/projects" 
              variant="outlined" 
              color="primary"
              startIcon={<SearchIcon />}
              sx={{ borderRadius: 2 }}
            >
              Browse Projects
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound; 