import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';

const Resume = () => {
  const handleDownload = () => {
    window.open('http://localhost:5000/api/resume/download', '_blank');
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>Resume</Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          sx={{ mt: 2 }}
        >
          Download Resume
        </Button>
      </Box>
    </Container>
  );
};

export default Resume; 