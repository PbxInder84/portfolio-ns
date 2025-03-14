import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  IconButton,
  Grid,
  useTheme,
  useMediaQuery,
  Paper,
  Button
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    position: 'CEO, Tech Company',
    avatar: '/path/to/avatar1.jpg',
    text: 'Working with this developer was an excellent experience. They delivered the project on time and exceeded our expectations with the quality of their work.'
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Project Manager',
    avatar: '/path/to/avatar2.jpg',
    text: 'I was impressed by their technical skills and problem-solving abilities. They were able to tackle complex challenges and find elegant solutions.'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    position: 'Startup Founder',
    avatar: '/path/to/avatar3.jpg',
    text: 'This developer helped turn our idea into reality. Their attention to detail and commitment to quality made all the difference in our project.'
  }
];

const TestimonialsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeStep, setActiveStep] = useState(0);
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => 
      prevActiveStep === testimonials.length - 1 ? 0 : prevActiveStep + 1
    );
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => 
      prevActiveStep === 0 ? testimonials.length - 1 : prevActiveStep - 1
    );
  };
  
  return (
    <Box component="section" className="section-alt" id="testimonials">
      <Container>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          What Clients Say
        </Typography>
        
        {isMobile ? (
          <Box sx={{ maxWidth: 400, mx: 'auto' }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                position: 'relative',
                minHeight: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
              className="card-hover"
            >
              <FormatQuoteIcon sx={{ color: 'primary.light', fontSize: 40, opacity: 0.3, mb: 2 }} />
              
              <Typography variant="body1" paragraph>
                "{testimonials[activeStep].text}"
              </Typography>
              
              <Box sx={{ mt: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Avatar 
                    src={testimonials[activeStep].avatar} 
                    alt={testimonials[activeStep].name}
                    sx={{ mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {testimonials[activeStep].name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonials[activeStep].position}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button 
                  size="small" 
                  onClick={handleBack}
                  startIcon={<KeyboardArrowLeft />}
                >
                  Previous
                </Button>
                <Button 
                  size="small" 
                  onClick={handleNext}
                  endIcon={<KeyboardArrowRight />}
                >
                  Next
                </Button>
              </Box>
            </Paper>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {testimonials.map((testimonial) => (
              <Grid item xs={12} md={4} key={testimonial.id}>
                <Card className="card-hover" sx={{ height: '100%', position: 'relative', pt: 3 }}>
                  <Box sx={{ position: 'absolute', top: -20, left: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Avatar 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      sx={{ width: 60, height: 60, border: '3px solid white', boxShadow: 2 }}
                    />
                  </Box>
                  <CardContent sx={{ pt: 4 }}>
                    <FormatQuoteIcon sx={{ color: 'primary.light', fontSize: 40, opacity: 0.3, mb: 1 }} />
                    <Typography variant="body1" paragraph>
                      "{testimonial.text}"
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.position}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default TestimonialsSection; 