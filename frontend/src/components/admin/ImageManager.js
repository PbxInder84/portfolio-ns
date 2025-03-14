import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress, 
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardActions,
  Alert,
  Snackbar,
  Container
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { uploadImage, getImages } from '../../services/imageApi';

const ImageManager = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await getImages();
      if (response.success) {
        setImages(response.data);
      } else {
        setError('Failed to fetch images');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to fetch images');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB
        setError('File size must be less than 5MB');
        setOpenSnackbar(true);
        return;
      }
      if (!file.type.match('image.*')) {
        setError('Only image files are allowed');
        setOpenSnackbar(true);
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      setOpenSnackbar(true);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await uploadImage(formData);
      if (response.success) {
        setSuccess('Image uploaded successfully!');
        setOpenSnackbar(true);
        setSelectedFile(null);
        // Reset the file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = '';
        }
        await fetchImages();
      } else {
        setError('Failed to upload image');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>Manage Images</Typography>
        
        <Box sx={{ my: 3, p: 3, border: '1px dashed #ccc', borderRadius: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Upload New Image</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <input
              accept="image/*"
              type="file"
              onChange={handleFileChange}
              style={{ flexGrow: 1 }}
            />
            <Button 
              variant="contained" 
              onClick={handleUpload}
              disabled={loading || !selectedFile}
            >
              {loading ? <CircularProgress size={24} /> : 'Upload Image'}
            </Button>
          </Box>
        </Box>

        <Snackbar 
          open={openSnackbar} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={error ? "error" : "success"} 
            sx={{ width: '100%' }}
          >
            {error || success}
          </Alert>
        </Snackbar>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>Uploaded Images</Typography>
          {loading && !images.length ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {images.map((image) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={image._id || image.publicId}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={image.url}
                      alt={image.fileName || 'Uploaded image'}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => {/* Add delete handler */}}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          
          {!loading && !images.length && (
            <Typography color="text.secondary" align="center" sx={{ my: 4 }}>
              No images uploaded yet
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ImageManager; 