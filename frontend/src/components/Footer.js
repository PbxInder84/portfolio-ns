import React from 'react';
import { Box, Container, Typography, Link, IconButton, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box component="footer" sx={{ 
      py: 4, 
      mt: 'auto',
      backgroundColor: 'background.paper',
      borderTop: '1px solid',
      borderColor: 'divider'
    }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Your Name. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mt: { xs: 2, md: 0 } }}>
            <IconButton color="inherit" aria-label="GitHub" component={Link} href="https://github.com" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="LinkedIn" component={Link} href="https://linkedin.com" target="_blank">
              <LinkedInIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Twitter" component={Link} href="https://twitter.com" target="_blank">
              <TwitterIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 