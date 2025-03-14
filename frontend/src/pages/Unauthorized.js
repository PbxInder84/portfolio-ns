import React from 'react';
import { Box, Container, Typography, Button, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import HomeIcon from '@mui/icons-material/Home';

const Unauthorized = () => {
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
          background: `radial-gradient(circle at 30% 70%, ${theme.palette.error.main}15, transparent 40%)`,
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
          <SecurityIcon 
            color="error" 
            sx={{ 
              fontSize: 80, 
              mb: 2,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { opacity: 1 },
                '50%': { opacity: 0.6 },
                '100%': { opacity: 1 }
              }
            }} 
          />
          
          <Typography variant="h3" component="h1" gutterBottom color="error.main">
            Access Denied
          </Typography>
          
          <Typography variant="h6" component="p" gutterBottom color="text.secondary">
            You don't have permission to access this page.
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            This area is restricted to administrators only. If you believe you should have access, 
            please contact the site administrator or try logging in with an account that has the required permissions.
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
              to="/login" 
              variant="outlined" 
              color="primary"
              sx={{ borderRadius: 2 }}
            >
              Login with Different Account
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Unauthorized; 