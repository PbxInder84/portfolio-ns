import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Alert,
  Snackbar,
  FormControlLabel,
  Checkbox,
  useTheme,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';
import { getExperiences, addExperience, updateExperience, deleteExperience } from '../../services/api';

const ExperienceManager = () => {
  const theme = useTheme();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [open, setOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    technologies: ''
  });
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Fetch experiences from API
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await getExperiences();
        setExperiences(response.data.data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching experiences:', error);
        setError('Failed to load experiences. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchExperiences();
  }, []);

  const handleOpen = (exp = null) => {
    if (exp) {
      // Format dates for the form
      const formattedExp = {
        ...exp,
        startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '',
        endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : ''
      };
      setCurrentExperience(formattedExp);
    } else {
      setCurrentExperience({
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        technologies: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentExperience(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // If current is checked, clear the end date
    if (name === 'current' && checked) {
      setCurrentExperience(prev => ({
        ...prev,
        endDate: ''
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Check if we're editing an existing entry or adding a new one
      if (currentExperience._id) {
        // Update existing experience
        const response = await updateExperience(currentExperience._id, currentExperience);
        
        setExperiences(prev => 
          prev.map(exp => 
            exp._id === currentExperience._id ? response.data.data : exp
          )
        );
        
        setSnackbar({
          open: true,
          message: 'Experience updated successfully!',
          severity: 'success'
        });
      } else {
        // Add new experience
        const response = await addExperience(currentExperience);
        setExperiences(prev => [...prev, response.data.data]);
        
        setSnackbar({
          open: true,
          message: 'Experience added successfully!',
          severity: 'success'
        });
      }
      
      handleClose();
    } catch (error) {
      console.error('Error saving experience:', error);
      setSnackbar({
        open: true,
        message: 'Failed to save experience. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExperience(id);
      
      // Remove experience from state
      setExperiences(prev => prev.filter(exp => exp._id !== id));
      
      setSnackbar({
        open: true,
        message: 'Experience deleted successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error deleting experience:', error);
      setSnackbar({
        open: true,
        message: 'Failed to delete experience. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ 
        fontWeight: 'bold',
        color: theme.palette.primary.main,
        mb: 4
      }}>
        Experience Management
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Experience
        </Button>
      </Box>
      
      {experiences.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="text.secondary">
            No experiences found. Click the "Add Experience" button to create one.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {experiences.map((exp) => (
            <Grid item xs={12} key={exp._id}>
              <Card 
                elevation={0} 
                sx={{ 
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 10px 20px -10px ${theme.palette.primary.main}40`,
                  }
                }}
              >
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <WorkIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6">
                          {exp.position}
                        </Typography>
                      </Box>
                      
                      <Typography variant="subtitle1" gutterBottom>
                        {exp.company} • {exp.location}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </Typography>
                      
                      <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                        {exp.description}
                      </Typography>
                      
                      {exp.technologies && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            <strong>Technologies:</strong> {exp.technologies}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                      <Box>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<EditIcon />}
                          onClick={() => handleOpen(exp)}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(exp._id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Add/Edit Experience Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentExperience._id ? 'Edit Experience' : 'Add Experience'}
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={currentExperience.company}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Position"
                name="position"
                value={currentExperience.position}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={currentExperience.location}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={currentExperience.startDate}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={currentExperience.current}
                      onChange={handleChange}
                      name="current"
                    />
                  }
                  label="Current Position"
                />
              </Box>
            </Grid>
            
            {!currentExperience.current && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={currentExperience.endDate}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  required={!currentExperience.current}
                />
              </Grid>
            )}
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Technologies Used"
                name="technologies"
                value={currentExperience.technologies}
                onChange={handleChange}
                variant="outlined"
                placeholder="e.g. React, Node.js, MongoDB"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={currentExperience.description}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            color="primary" 
            variant="contained"
            disabled={
              !currentExperience.company ||
              !currentExperience.position ||
              !currentExperience.startDate ||
              (!currentExperience.current && !currentExperience.endDate) ||
              !currentExperience.description
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ExperienceManager;
