import React, { useState } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import AdminDashboard from '../components/AdminDashboard';

const Admin = () => {
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  if (user) {
    return <AdminDashboard />;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Admin Access
          </Typography>
          {isLogin ? (
            <LoginForm switchToSignup={toggleForm} />
          ) : (
            <SignupForm switchToLogin={toggleForm} />
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Admin; 