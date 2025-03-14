import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import api from '../../services/api';

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('technologies', formData.technologies);
    data.append('image', formData.image);

    try {
      await api.post('/projects/add', data);
      alert('Project added successfully!');
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project. Please try again.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Technologies"
        name="technologies"
        value={formData.technologies}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Project
      </Button>
    </Box>
  );
};

export default AddProjectForm; 