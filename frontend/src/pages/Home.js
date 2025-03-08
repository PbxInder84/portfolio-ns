import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { getProfile } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (error) {
        // Only log errors that aren't 401 unauthorized
        if (error.response?.status !== 401) {
          console.error('Error fetching profile:', error);
        }
        setError(error.response?.data?.message || 'Error loading profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to My Portfolio
        </Typography>
        {profile && (
          <Box>
            <Typography variant="h5">{profile.name}</Typography>
            <Typography variant="body1">{profile.bio}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home; 