import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  Link, 
  Alert, 
  CircularProgress,
  useTheme,
  Divider
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DownloadIcon from '@mui/icons-material/Download';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' // Fixed as user
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'user' // Always register as user
      });
      
      // Show success message and redirect to login
      alert('Registration successful! Please login with your new account.');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex',
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
      {/* Left Side - Branding */}
      <Box 
        sx={{ 
          flex: 1, 
          display: { xs: 'none', md: 'flex' }, 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 8,
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(10, 25, 47, 0.9)' 
            : 'rgba(0, 240, 255, 0.05)',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '1px',
            height: '100%',
            backgroundColor: theme.palette.divider
          }
        }}
      >
        <Box 
          component="img"
          src="/logo.png" // Make sure to add your logo to the public folder
          alt="Portfolio Logo"
          sx={{ 
            width: 120, 
            height: 120, 
            mb: 4,
            filter: theme.palette.mode === 'dark' ? 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.5))' : 'none'
          }}
        />
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            mb: 2,
            textAlign: 'center',
            color: theme.palette.mode === 'dark' ? theme.palette.primary.main : 'inherit'
          }}
        >
          Narinder Singh
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 4, 
            opacity: 0.8,
            textAlign: 'center'
          }}
        >
          Full Stack Developer
        </Typography>
        <Box sx={{ 
          maxWidth: 400, 
          textAlign: 'center',
          opacity: 0.9,
          mb: 4,
          p: 3,
          borderRadius: 2,
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 240, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
          border: `1px solid ${theme.palette.divider}`
        }}>
          <Typography variant="h6" gutterBottom color="primary">
            Member Benefits
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <DownloadIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1">
              Download project source code
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Create an account to access exclusive content and download project resources.
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Register Form */}
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 2, sm: 4, md: 8 }
        }}
      >
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, sm: 4 }, 
            width: '100%', 
            maxWidth: 450,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              mb: 3
            }}
          >
            <Box 
              sx={{ 
                width: 56, 
                height: 56, 
                borderRadius: '50%', 
                backgroundColor: theme.palette.primary.main,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 2,
                color: '#fff'
              }}
            >
              <PersonAddIcon fontSize="large" />
            </Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Register to download projects and access exclusive content
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{ 
                py: 1.5,
                mb: 2,
                borderRadius: 2,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2" color="primary">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            component={RouterLink} 
            to="/" 
            color="primary"
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register; 