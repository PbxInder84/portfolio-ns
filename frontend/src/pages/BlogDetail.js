import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Chip, 
  Button, 
  Divider, 
  CircularProgress, 
  Alert,
  Avatar,
  Card,
  CardContent,
  useTheme,
  Link
} from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import { getBlogById, saveBlog, unsaveBlog } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown';

const BlogDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const { isAuthenticated, user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [savingStatus, setSavingStatus] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogById(id);
        
        // Handle different response structures
        const blogData = response.data.data || response.data;
        
        if (!blogData) {
          setError('Blog post not found');
        } else {
          setBlog(blogData);
          
          // Check if this blog is saved by the user
          if (isAuthenticated && blogData.savedBy) {
            setIsSaved(blogData.savedBy.includes(user.id));
          }
          
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, isAuthenticated, user]);

  const handleSaveToggle = async () => {
    if (!isAuthenticated) {
      setSavingStatus({
        type: 'error',
        message: 'Please login to save this blog post'
      });
      return;
    }

    try {
      setSavingStatus({ type: 'loading' });
      
      if (isSaved) {
        await unsaveBlog(id);
        setIsSaved(false);
        setSavingStatus({
          type: 'success',
          message: 'Blog post removed from your saved items'
        });
      } else {
        await saveBlog(id);
        setIsSaved(true);
        setSavingStatus({
          type: 'success',
          message: 'Blog post saved successfully'
        });
      }
      
      // Clear status after 3 seconds
      setTimeout(() => {
        setSavingStatus(null);
      }, 3000);
    } catch (err) {
      console.error('Error saving/unsaving blog:', err);
      setSavingStatus({
        type: 'error',
        message: 'Failed to update saved status. Please try again.'
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      setSavingStatus({
        type: 'success',
        message: 'Link copied to clipboard'
      });
      
      // Clear status after 3 seconds
      setTimeout(() => {
        setSavingStatus(null);
      }, 3000);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Button 
          component={RouterLink} 
          to="/blog" 
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to Blog
        </Button>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="info" sx={{ mb: 4 }}>
          Blog post not found
        </Alert>
        <Button 
          component={RouterLink} 
          to="/blog" 
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to Blog
        </Button>
      </Container>
    );
  }

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
          background: `radial-gradient(circle at 20% 80%, ${theme.palette.primary.main}15, transparent 40%)`,
          zIndex: -1
        }
      }}
    >
      <Container maxWidth="md">
        <Button 
          component={RouterLink} 
          to="/blog" 
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 4 }}
        >
          Back to Blog
        </Button>

        {/* Blog Header */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {blog.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3, mb: { xs: 1, sm: 0 } }}>
              <Avatar 
                src={blog.author?.avatar} 
                alt={blog.author?.name}
                sx={{ mr: 1, width: 32, height: 32 }}
              >
                <PersonIcon />
              </Avatar>
              <Typography variant="body2" color="text.secondary">
                {blog.author?.name || 'Anonymous'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3, mb: { xs: 1, sm: 0 } }}>
              <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {formatDate(blog.createdAt)}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {blog.tags && blog.tags.map((tag, index) => (
                <Chip 
                  key={index} 
                  label={tag} 
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button 
              variant="outlined" 
              size="small"
              startIcon={isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              onClick={handleSaveToggle}
            >
              {isSaved ? 'Saved' : 'Save'}
            </Button>
            
            <Button 
              variant="outlined" 
              size="small"
              startIcon={<ShareIcon />}
              onClick={handleShare}
            >
              Share
            </Button>
          </Box>
          
          {savingStatus && (
            <Alert 
              severity={savingStatus.type === 'error' ? 'error' : 'success'} 
              sx={{ mb: 3 }}
            >
              {savingStatus.type === 'loading' ? 'Processing...' : savingStatus.message}
            </Alert>
          )}
          
          {!isAuthenticated && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                Please <Link component={RouterLink} to="/login">login</Link> or <Link component={RouterLink} to="/register">register</Link> to save this blog post.
              </Typography>
            </Alert>
          )}
        </Box>

        {/* Featured Image */}
        {blog.image && (
          <Box 
            sx={{ 
              mb: 6,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: theme.shadows[2]
            }}
          >
            <Box 
              component="img"
              src={blog.image}
              alt={blog.title}
              sx={{ 
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </Box>
        )}

        {/* Blog Content */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            mb: 6
          }}
        >
          <Box 
            sx={{ 
              '& img': { 
                maxWidth: '100%', 
                height: 'auto',
                borderRadius: 1,
                my: 2
              },
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                mt: 4,
                mb: 2,
                fontWeight: 'bold'
              },
              '& p': {
                mb: 2,
                lineHeight: 1.7
              },
              '& a': {
                color: theme.palette.primary.main,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              },
              '& blockquote': {
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                pl: 2,
                py: 1,
                my: 2,
                fontStyle: 'italic',
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
              },
              '& code': {
                fontFamily: 'monospace',
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                p: 0.5,
                borderRadius: 0.5
              },
              '& pre': {
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)',
                p: 2,
                borderRadius: 1,
                overflow: 'auto',
                '& code': {
                  bgcolor: 'transparent'
                }
              },
              '& ul, & ol': {
                pl: 3,
                mb: 2
              },
              '& li': {
                mb: 1
              }
            }}
          >
            {blog.content && (
              <ReactMarkdown>
                {blog.content}
              </ReactMarkdown>
            )}
          </Box>
        </Paper>

        {/* Author Bio */}
        {blog.author && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              About the Author
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'center', sm: 'flex-start' },
                gap: 3
              }}
            >
              <Avatar 
                src={blog.author.avatar} 
                alt={blog.author.name}
                sx={{ width: 80, height: 80 }}
              >
                <PersonIcon fontSize="large" />
              </Avatar>
              
              <Box>
                <Typography variant="h6" gutterBottom>
                  {blog.author.name}
                </Typography>
                <Typography variant="body2" paragraph>
                  {blog.author.bio || 'No bio available'}
                </Typography>
                {blog.author.socialLinks && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {Object.entries(blog.author.socialLinks).map(([platform, url]) => (
                      url && (
                        <Button 
                          key={platform}
                          variant="outlined" 
                          size="small"
                          component={Link}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {platform}
                        </Button>
                      )
                    ))}
                  </Box>
                )}
              </Box>
            </Paper>
          </Box>
        )}

        {/* Related Posts */}
        {blog.relatedPosts && blog.relatedPosts.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Related Posts
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              {blog.relatedPosts.map((relatedPost, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    component={RouterLink}
                    to={`/blog/${relatedPost.id}`}
                    sx={{ 
                      height: '100%',
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      textDecoration: 'none',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 10px 20px -10px ${theme.palette.primary.main}40`,
                      }
                    }}
                  >
                    {relatedPost.image && (
                      <Box 
                        sx={{ 
                          height: 140,
                          overflow: 'hidden'
                        }}
                      >
                        <Box 
                          component="img"
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          sx={{ 
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </Box>
                    )}
                    <CardContent>
                      <Typography variant="h6" component="h3" color="text.primary">
                        {relatedPost.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {relatedPost.excerpt}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BlogDetail; 