import React from 'react';
import { Box, Container, Typography, Button, Stack, useTheme, useMediaQuery, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link as ScrollLink } from 'react-scroll';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      component="section" 
      className="cyber-bg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 8, md: 0 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 30%, ${theme.palette.primary.main}15, transparent 40%)`,
          zIndex: -1
        }
      }}
    >
      {/* Background elements */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          opacity: 0.05,
          zIndex: 0,
          backgroundImage: 'url(/path/to/pattern.svg)',
          backgroundRepeat: 'repeat',
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: '600px' }}>
            <Typography 
              variant="overline" 
              component="div" 
              sx={{ 
                mb: 2, 
                color: theme.palette.primary.main,
                fontWeight: 600,
                letterSpacing: 2,
                display: 'block'
              }}
            >
              Hello, my name is
            </Typography>
            
            <Typography 
              variant="h1" 
              component="h1" 
              className="glitch-text"
              data-text="Narinder"
              sx={{ 
                mb: 1,
                fontSize: { xs: '3rem', md: '5rem' },
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                position: 'relative'
              }}
            >
              Narinder
            </Typography>
            
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                mb: 3,
                color: theme.palette.text.secondary,
                fontSize: { xs: '2rem', md: '3.5rem' },
                fontWeight: 600,
                letterSpacing: '-0.01em',
                lineHeight: 1.2
              }}
            >
              I build things for the web.
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 5, 
                maxWidth: '600px',
                fontSize: '1.1rem',
                lineHeight: 1.7
              }}
            >
              I'm a full-stack developer specializing in building exceptional digital experiences. 
              Currently, I'm focused on creating accessible, human-centered products.
            </Typography>
            
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2}
              sx={{ mb: 8 }}
            >
              <Button 
                variant="contained" 
                size="large"
                className="neon-button"
                sx={{
                  borderRadius: '4px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}00, ${theme.palette.primary.main}40, ${theme.palette.primary.main}00)`,
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.6s ease-in-out'
                  },
                  '&:hover::after': {
                    transform: 'translateX(100%)'
                  }
                }}
                component="a"
                href="#contact"
              >
                Get In Touch
              </Button>
              
              <Button 
                variant="outlined" 
                size="large"
                startIcon={<DownloadIcon />}
                sx={{
                  borderRadius: '4px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px',
                    backgroundColor: `${theme.palette.primary.main}10`
                  }
                }}
                component="a"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </Button>
            </Stack>
            
            <Box sx={{ textAlign: 'center' }}>
              <ScrollLink to="about" smooth={true} duration={500}>
                <IconButton 
                  sx={{ 
                    animation: 'bounce 2s infinite',
                    '@keyframes bounce': {
                      '0%, 20%, 50%, 80%, 100%': {
                        transform: 'translateY(0)'
                      },
                      '40%': {
                        transform: 'translateY(-20px)'
                      },
                      '60%': {
                        transform: 'translateY(-10px)'
                      }
                    }
                  }}
                >
                  <KeyboardArrowDownIcon fontSize="large" />
                </IconButton>
              </ScrollLink>
            </Box>
          </Box>
          
          {!isMobile && (
            <Box 
              sx={{
                position: 'relative',
                width: '400px',
                height: '400px',
              }}
            >
              <Box 
                component="img"
                src="/path/to/hero-image.png"
                alt="Developer illustration"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  animation: 'float 3s ease-in-out infinite',
                  '@keyframes float': {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                    '100%': { transform: 'translateY(0px)' },
                  }
                }}
              />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection; 