import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  Button, 
  Box, 
  Chip, 
  Divider,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getBlogs } from '../services/api';

const Blog = () => {
  const theme = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await getBlogs();
        
        // Handle different response structures
        const blogsData = response.data.data || response.data || [];
        
        setBlogs(blogsData);
        setFilteredBlogs(blogsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    // Filter blogs based on search term and category
    let result = blogs;
    
    if (searchTerm) {
      result = result.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    
    if (selectedCategory !== 'all') {
      result = result.filter(blog => 
        blog.category === selectedCategory
      );
    }
    
    setFilteredBlogs(result);
  }, [searchTerm, selectedCategory, blogs]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Extract unique categories from blogs
  const categories = ['all', ...new Set(blogs.map(blog => blog.category).filter(Boolean))];

  return (
    <Box 
      component="section" 
      sx={{ 
        py: 10,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 80% 20%, ${theme.palette.primary.main}15, transparent 40%)`,
          zIndex: -1
        }
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Blog
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph sx={{ mb: 5 }}>
          Thoughts, stories and ideas about web development and technology
        </Typography>
        
        {/* Search and Filter */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category === 'all' ? 'All Categories' : category}
                    onClick={() => handleCategoryChange(category)}
                    color={selectedCategory === category ? 'primary' : 'default'}
                    variant={selectedCategory === category ? 'filled' : 'outlined'}
                    sx={{ textTransform: 'capitalize' }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : filteredBlogs.length === 0 ? (
          <Alert severity="info" sx={{ mb: 4 }}>
            No blog posts found matching your criteria.
          </Alert>
        ) : (
          <Grid container spacing={4}>
            {filteredBlogs.map((blog) => {
              // Extract id from different possible formats
              const id = blog._id || blog.id;
              
              return (
                <Grid item xs={12} md={6} lg={4} key={id}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 10px 20px -10px ${theme.palette.primary.main}40`,
                      }
                    }}
                  >
                    {blog.image && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={blog.image}
                        alt={blog.title}
                        sx={{ objectFit: 'cover' }}
                      />
                    )}
                    
                    <CardContent sx={{ flexGrow: 1 }}>
                      {blog.category && (
                        <Chip 
                          label={blog.category} 
                          size="small" 
                          color="primary" 
                          sx={{ mb: 2, textTransform: 'capitalize' }} 
                        />
                      )}
                      
                      <Typography variant="h5" component="h2" gutterBottom>
                        {blog.title}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(blog.date || blog.createdAt)}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {blog.excerpt || (blog.content && blog.content.substring(0, 150) + '...')}
                      </Typography>
                      
                      {blog.tags && blog.tags.length > 0 && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                          {blog.tags.map((tag, index) => (
                            <Chip 
                              key={index} 
                              label={tag} 
                              size="small" 
                              variant="outlined"
                              sx={{ m: 0.5 }}
                            />
                          ))}
                        </Box>
                      )}
                    </CardContent>
                    
                    <Divider />
                    
                    <CardActions>
                      <Button 
                        component={RouterLink} 
                        to={`/blog/${id}`}
                        endIcon={<ArrowForwardIcon />}
                        sx={{ ml: 'auto' }}
                      >
                        Read More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Blog; 