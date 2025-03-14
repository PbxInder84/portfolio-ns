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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user' // Default role
  });

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/';

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
      
      // Check if the user has the required role for admin access
      if (formData.role === 'admin' && response.data.user.role !== 'admin') {
        setError('You do not have admin privileges');
        setLoading(false);
        return;
      }
      
      authLogin({
        ...response.data,
        user: {
          ...response.data.user,
          role: response.data.user.role || 'user' // Ensure role is set
        }
      });
      
      // Redirect based on role
      if (response.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate(from);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
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
          background: `radial-gradient(circle at 80% 20%, ${theme.palette.primary.main}15, transparent 40%)`,
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
        <Typography 
          variant="body1" 
          sx={{ 
            maxWidth: 400, 
            textAlign: 'center',
            opacity: 0.7
          }}
        >
          Welcome back! Please login to access your account and manage your portfolio content.
        </Typography>
      </Box>

      {/* Right Side - Login Form */}
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
                backgroundColor: formData.role === 'admin' ? theme.palette.secondary.main : theme.palette.primary.main,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 2,
                color: '#fff',
                transition: 'background-color 0.3s ease'
              }}
            >
              {formData.role === 'admin' ? <AdminPanelSettingsIcon fontSize="large" /> : <LockOutlinedIcon fontSize="large" />}
            </Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {formData.role === 'admin' ? 'Admin Login' : 'User Login'}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Enter your credentials to access your account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
              <InputLabel id="role-select-label">Login As</InputLabel>
              <Select
                labelId="role-select-label"
                id="role"
                name="role"
                value={formData.role}
                label="Login As"
                onChange={handleChange}
              >
                <MenuItem value="user">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    User
                  </Box>
                </MenuItem>
                <MenuItem value="admin">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AdminPanelSettingsIcon sx={{ mr: 1, color: theme.palette.secondary.main }} />
                    Administrator
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color={formData.role === 'admin' ? 'secondary' : 'primary'}
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
            
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link component={RouterLink} to="/forgot-password" variant="body2" color={formData.role === 'admin' ? 'secondary' : 'primary'}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2" color={formData.role === 'admin' ? 'secondary' : 'primary'}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            component={RouterLink} 
            to="/" 
            color={formData.role === 'admin' ? 'secondary' : 'primary'}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login; 