import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Link, 
  Alert, 
  CircularProgress,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Note: You'll need to add this function to your API service
// import { requestPasswordReset } from '../services/api';

const ForgotPassword = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      // In a real implementation, you would call your API
      // await requestPasswordReset({ email });
      
      // For now, we'll simulate a successful API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      setEmail('');
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.response?.data?.message || 'Failed to send reset link. Please try again.');
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
          background: `radial-gradient(circle at 30% 70%, ${theme.palette.primary.main}15, transparent 40%)`,
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
          sx={{ 
            width: 120, 
            height: 120, 
            borderRadius: '50%', 
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 240, 255, 0.05)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 4,
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 0 20px rgba(0, 240, 255, 0.3)' 
              : '0 0 20px rgba(0, 240, 255, 0.1)'
          }}
        >
          <LockResetIcon 
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
            color: theme.palette.mode === 'dark' ? theme.palette.primary.main : 'inherit'
          }}
        >
          Password Recovery
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 4, 
            opacity: 0.8,
            textAlign: 'center'
          }}
        >
          Reset your account password
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            maxWidth: 400, 
            textAlign: 'center',
            opacity: 0.7
          }}
        >
          Enter your email address and we'll send you a link to reset your password. Please check your inbox after submitting the form.
        </Typography>
      </Box>

      {/* Right Side - Reset Form */}
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
                color: theme.palette.primary.contrastText
              }}
            >
              <EmailIcon fontSize="large" />
            </Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Forgot Password
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Enter your email to receive a password reset link
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Password reset link has been sent to your email address. Please check your inbox.
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleChange}
              disabled={loading || success}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={loading || success || !email}
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
            </Button>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                component={RouterLink}
                to="/login"
                color="primary"
                startIcon={<ArrowBackIcon />}
                sx={{ textTransform: 'none' }}
              >
                Back to Login
              </Button>
            </Box>
          </Box>
        </Paper>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            component={RouterLink} 
            to="/" 
            color="primary"
          >
            Return to Portfolio
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword; 