import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Chip,
  Box,
  InputAdornment,
  IconButton,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardMedia
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import { addProject, updateProject, uploadProjectImage } from '../../services/api';

const ProjectForm = ({ open, onClose, project = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    technologies: [],
    githubLink: '',
    demoLink: '',
    category: '',
    technicalDetails: '',
    features: [],
    image: ''
  });
  
  const [newTechnology, setNewTechnology] = useState('');
  const [newFeature, setNewFeature] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        longDescription: project.longDescription || '',
        technologies: project.technologies || [],
        githubLink: project.githubLink || '',
        demoLink: project.demoLink || '',
        category: project.category || '',
        technicalDetails: project.technicalDetails || '',
        features: project.features || [],
        image: project.image || ''
      });
      
      if (project.image) {
        setImagePreview(project.image);
      }
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleAddTechnology = () => {
    if (newTechnology.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology('');
    }
  };

  const handleDeleteTechnology = (techToDelete) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToDelete)
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.title.trim() && newFeature.description.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, { ...newFeature }]
      }));
      setNewFeature({ title: '', description: '' });
    }
  };

  const handleDeleteFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (projectId) => {
    if (!imageFile) return null;
    
    try {
      setImageLoading(true);
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await uploadProjectImage(projectId, formData);
      return response.data.data.image;
    } catch (err) {
      console.error('Error uploading image:', err);
      throw new Error('Failed to upload image');
    } finally {
      setImageLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      let projectData = { ...formData };
      
      if (project) {
        // Update existing project
        const response = await updateProject(project.id || project._id, projectData);
        
        // Upload image if a new one is selected
        if (imageFile) {
          const imageUrl = await uploadImage(response.data.data.id || response.data.data._id);
          if (imageUrl) {
            await updateProject(response.data.data.id || response.data.data._id, { image: imageUrl });
          }
        }
      } else {
        // Add new project
        const response = await addProject(projectData);
        
        // Upload image if selected
        if (imageFile) {
          const imageUrl = await uploadImage(response.data.data.id || response.data.data._id);
          if (imageUrl) {
            await updateProject(response.data.data.id || response.data.data._id, { image: imageUrl });
          }
        }
      }
      
      onClose(true); // Close with refresh flag
    } catch (err) {
      console.error('Error saving project:', err);
      setError(err.response?.data?.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="md" fullWidth>
      <DialogTitle>
        {project ? 'Edit Project' : 'Add New Project'}
        <IconButton
          aria-label="close"
          onClick={() => onClose(false)}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Project Cover Image
              </Typography>
              
              {imagePreview ? (
                <Card sx={{ mb: 2, position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={imagePreview}
                    alt="Project cover"
                    sx={{ height: 200, objectFit: 'cover' }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                    }}
                    onClick={() => {
                      setImagePreview('');
                      setImageFile(null);
                      setFormData(prev => ({ ...prev, image: '' }));
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Card>
              ) : (
                <Box
                  sx={{
                    border: '2px dashed',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                    mb: 2
                  }}
                >
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    No image selected
                  </Typography>
                </Box>
              )}
              
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
                disabled={imageLoading}
                fullWidth
              >
                {imageLoading ? 'Uploading...' : 'Upload Cover Image'}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              error={!!errors.title}
              helperText={errors.title}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Short Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={2}
              error={!!errors.description}
              helperText={errors.description}
              required
              placeholder="A brief description of your project (required)"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Long Description"
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              placeholder="A detailed description of your project"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="GitHub Link"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              margin="normal"
              placeholder="https://github.com/username/repo"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Demo Link"
              name="demoLink"
              value={formData.demoLink}
              onChange={handleChange}
              margin="normal"
              placeholder="https://demo-site.com"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              margin="normal"
              placeholder="e.g. Web Development, Mobile App, etc."
            />
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Technologies
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TextField
                fullWidth
                label="Add Technology"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
                placeholder="e.g. React, Node.js, etc."
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleAddTechnology} edge="end">
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.technologies.map((tech, index) => (
                <Chip
                  key={index}
                  label={tech}
                  onDelete={() => handleDeleteTechnology(tech)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Technical Details"
              name="technicalDetails"
              value={formData.technicalDetails}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
              placeholder="Technical challenges, architecture, implementation details, etc."
            />
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Features
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Feature Title"
                  value={newFeature.title}
                  onChange={(e) => setNewFeature(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. User Authentication"
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Feature Description"
                  value={newFeature.description}
                  onChange={(e) => setNewFeature(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the feature"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  variant="outlined"
                  onClick={handleAddFeature}
                  startIcon={<AddIcon />}
                  fullWidth
                  sx={{ height: '100%' }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            
            {formData.features.length > 0 && (
              <Box sx={{ mt: 2 }}>
                {formData.features.map((feature, index) => (
                  <Box key={index} sx={{ mb: 1, p: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle2">{feature.title}</Typography>
                      <IconButton size="small" onClick={() => handleDeleteFeature(index)}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={loading || imageLoading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? 'Saving...' : project ? 'Update Project' : 'Add Project'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectForm; 