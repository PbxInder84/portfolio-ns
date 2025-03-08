import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>Blog Posts</Typography>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} md={6} key={blog._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>{blog.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(blog.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {blog.content.substring(0, 200)}...
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Read More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blog; 