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
  CircularProgress,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';
import { getEducation, addEducation, updateEducation, deleteEducation } from '../../services/api';

const EducationManager = () => {
  const theme = useTheme();
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [open, setOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
    gpa: ''
  });
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Fetch education from API
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const response = await getEducation();
        setEducation(response.data.data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching education:', error);
        setError('Failed to load education data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEducation();
  }, []);

  const handleOpen = (edu = null) => {
    if (edu) {
      // Format dates for the form
      const formattedEdu = {
        ...edu,
        startDate: edu.startDate ? new Date(edu.startDate).toISOString().split('T')[0] : '',
        endDate: edu.endDate ? new Date(edu.endDate).toISOString().split('T')[0] : ''
      };
      setCurrentEducation(formattedEdu);
    } else {
      setCurrentEducation({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: '',
        gpa: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEducation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      // Check if we're editing an existing entry or adding a new one
      if (currentEducation._id) {
        // Update existing education
        const response = await updateEducation(currentEducation._id, currentEducation);
        
        setEducation(prev => 
          prev.map(edu => 
            edu._id === currentEducation._id ? response.data.data : edu
          )
        );
        
        setSnackbar({
          open: true,
          message: 'Education updated successfully!',
          severity: 'success'
        });
      } else {
        // Add new education
        const response = await addEducation(currentEducation);
        setEducation(prev => [...prev, response.data.data]);
        
        setSnackbar({
          open: true,
          message: 'Education added successfully!',
          severity: 'success'
        });
      }
      
      handleClose();
    } catch (error) {
      console.error('Error saving education:', error);
      setSnackbar({
        open: true,
        message: 'Failed to save education. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEducation(id);
      
      // Remove education from state
      setEducation(prev => prev.filter(edu => edu._id !== id));
      
      setSnackbar({
        open: true,
        message: 'Education deleted successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error deleting education:', error);
      setSnackbar({
        open: true,
        message: 'Failed to delete education. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
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
        Education Management
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Education
        </Button>
      </Box>
      
      {education.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="text.secondary">
            No education entries found. Click the "Add Education" button to create one.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {education.map((edu) => (
            <Grid item xs={12} md={6} key={edu._id}>
              <Card 
                elevation={0} 
                sx={{ 
                  height: '100%',
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
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SchoolIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      {edu.institution}
                    </Typography>
                  </Box>
                  
                  <Typography variant="subtitle1" gutterBottom>
                    {edu.degree} in {edu.field}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Typography>
                  
                  <Box sx={{ my: 2, borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }} />
                  
                  <Typography variant="body2">
                    {edu.description}
                  </Typography>
                  
                  {edu.gpa && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>GPA:</strong> {edu.gpa}
                    </Typography>
                  )}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpen(edu)}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    
                    <Button
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(edu._id)}
                      size="small"
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Add/Edit Education Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentEducation._id ? 'Edit Education' : 'Add Education'}
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Institution"
                name="institution"
                value={currentEducation.institution}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Degree"
                name="degree"
                value={currentEducation.degree}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Field of Study"
                name="field"
                value={currentEducation.field}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={currentEducation.startDate}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                name="endDate"
                type="date"
                value={currentEducation.endDate}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="GPA"
                name="gpa"
                value={currentEducation.gpa}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={currentEducation.description}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
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
              !currentEducation.institution ||
              !currentEducation.degree ||
              !currentEducation.field ||
              !currentEducation.startDate ||
              !currentEducation.endDate
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

export default EducationManager; 