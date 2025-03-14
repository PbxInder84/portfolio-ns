import React, { useState, useEffect } from 'react';
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
  useTheme
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SecurityIcon from '@mui/icons-material/Security';

const Admin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login: authLogin, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

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
    setLoading(true);

    try {
      const response = await login(formData);
      authLogin(response.data);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Access denied. Please check your credentials.');
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
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(10, 25, 47, 0.8) 100%)' 
          : 'linear-gradient(135deg, rgba(240, 240, 240, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
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
      <Box 
        sx={{ 
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 4 }
        }}
      >
        {/* Left Side - Admin Branding */}
        <Box 
          sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 3, md: 8 },
            mb: { xs: 4, md: 0 }
          }}
        >
          <Box 
            sx={{ 
              width: 100, 
              height: 100, 
              borderRadius: '50%', 
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 240, 255, 0.05)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 3,
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 0 20px rgba(0, 240, 255, 0.3)' 
                : '0 0 20px rgba(0, 240, 255, 0.1)'
            }}
          >
            <AdminPanelSettingsIcon 
              sx={{ 
                fontSize: 60, 
                color: theme.palette.primary.main 
              }} 
            />
          </Box>
          
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              textAlign: 'center',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(90deg, #00f0ff, #0066ff)'
                : 'linear-gradient(90deg, #0066ff, #00f0ff)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Admin Portal
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              opacity: 0.8,
              textAlign: 'center'
            }}
          >
            Secure Dashboard Access
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
              borderRadius: 2,
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(10, 25, 47, 0.7)' 
                : 'rgba(255, 255, 255, 0.7)',
              border: `1px solid ${theme.palette.divider}`,
              maxWidth: 400
            }}
          >
            <SecurityIcon 
              color="primary" 
              sx={{ mr: 2, fontSize: 24 }} 
            />
            <Typography variant="body1">
              This area is restricted to authorized administrators only. Please authenticate to continue.
            </Typography>
          </Box>
        </Box>

        {/* Right Side - Login Form */}
        <Box 
          sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 2, md: 4 }
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
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(10, 25, 47, 0.8)' 
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)'
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
              <Typography variant="h4" component="h2" gutterBottom>
                Administrator Login
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Enter your credentials to access the admin dashboard
              </Typography>
            </Box>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2
                }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Admin Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
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
                    backgroundColor: theme.palette.primary.dark
                  }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Access Dashboard'}
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link component={RouterLink} to="/forgot-password" variant="body2" color="primary">
                    Forgot admin password?
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
              sx={{
                borderRadius: 2,
                px: 3
              }}
            >
              Return to Portfolio
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin; 