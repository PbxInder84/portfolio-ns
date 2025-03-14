import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const resetPassword = (token, newPassword) => api.post('/auth/reset-password', { token, newPassword });
export const verifyToken = (token) => api.get(`/auth/verify-token/${token}`);
export const refreshToken = () => api.post('/auth/refresh-token');

// User API calls
export const getCurrentUser = () => api.get('/user/me');
export const updateUserProfile = (userData) => api.put('/user/profile', userData);
export const changePassword = (passwordData) => api.put('/user/change-password', passwordData);
export const deleteAccount = () => api.delete('/user/account');

// Profile API calls
export const getProfile = () => api.get('/profile');
export const updateProfile = (profileData) => api.put('/profile', profileData);
export const uploadAvatar = (formData) => api.post('/profile/avatar', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

// Education API calls
export const getEducation = () => api.get('/education');
export const addEducation = (educationData) => api.post('/education', educationData);
export const updateEducation = (id, educationData) => api.put(`/education/${id}`, educationData);
export const deleteEducation = (id) => api.delete(`/education/${id}`);

// Experience API calls
export const getExperiences = () => api.get('/experience');
export const addExperience = (experienceData) => api.post('/experience', experienceData);
export const updateExperience = (id, experienceData) => api.put(`/experience/${id}`, experienceData);
export const deleteExperience = (id) => api.delete(`/experience/${id}`);

// Projects API calls
export const getProjects = () => api.get('/projects');
export const getProjectById = (id) => api.get(`/projects/${id}`).catch(error => {
  // If the API returns 404, throw a more specific error
  if (error.response && error.response.status === 404) {
    throw new Error('Project not found in API');
  }
  throw error;
});
export const addProject = (projectData) => api.post('/projects', projectData);
export const updateProject = (id, projectData) => api.put(`/projects/${id}`, projectData);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
export const downloadProject = (id) => api.get(`/projects/${id}/download`, { responseType: 'blob' })
  .then(response => {
    // Create a blob link to download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `project-${id}.zip`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  });
export const uploadProjectImage = (projectId, formData) => {
  return api.post(`/projects/${projectId}/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Blog API calls
export const getBlogs = () => api.get('/blogs');
export const getBlogById = (id) => api.get(`/blogs/${id}`);
export const addBlog = (blogData) => api.post('/blogs', blogData);
export const updateBlog = (id, blogData) => api.put(`/blogs/${id}`, blogData);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);
export const saveBlog = (id) => api.post(`/blogs/${id}/save`);
export const unsaveBlog = (id) => api.delete(`/blogs/${id}/save`);
export const getSavedBlogs = () => api.get('/blogs/saved');
export const uploadBlogImage = (id, formData) => api.post(`/blogs/${id}/image`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

// Resume API calls
export const getResume = () => {
  // Since the endpoint doesn't exist yet, return a mock response
  return Promise.resolve({
    data: {
      success: true,
      data: {
        education: [
          {
            institution: 'University of Technology',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            startDate: '2016-09-01',
            endDate: '2020-05-30',
            location: 'New York, NY',
            description: 'Graduated with honors. Focused on software engineering and web development.'
          }
        ],
        experience: [
          {
            company: 'Tech Solutions Inc.',
            position: 'Full Stack Developer',
            startDate: '2020-06-01',
            current: true,
            location: 'San Francisco, CA',
            description: 'Developing and maintaining web applications using React, Node.js, and MongoDB.'
          },
          {
            company: 'Startup Innovations',
            position: 'Frontend Developer Intern',
            startDate: '2019-05-01',
            endDate: '2019-08-30',
            location: 'Boston, MA',
            description: 'Assisted in developing user interfaces and implementing responsive designs.'
          }
        ],
        skills: [
          { name: 'JavaScript', level: 90 },
          { name: 'React', level: 85 },
          { name: 'Node.js', level: 80 },
          { name: 'MongoDB', level: 75 },
          { name: 'HTML/CSS', level: 90 },
          { name: 'Git', level: 85 }
        ],
        certifications: [
          'AWS Certified Developer - Associate',
          'MongoDB Certified Developer',
          'React Certification'
        ],
        languages: ['English (Native)', 'Spanish (Intermediate)'],
        summary: 'Full Stack Developer with expertise in modern web technologies. Passionate about creating efficient, scalable, and user-friendly applications.'
      }
    }
  });
};
export const updateResume = (resumeData) => api.put('/resume', resumeData);
export const uploadResumeFile = (formData) => api.post('/resume/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const downloadResume = () => api.get('/resume/download', { responseType: 'blob' })
  .then(response => {
    // Create a blob link to download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'resume.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  });

// Testimonial API calls
export const getTestimonials = () => api.get('/testimonials');
export const addTestimonial = (testimonialData) => api.post('/testimonials', testimonialData);
export const updateTestimonial = (id, testimonialData) => api.put(`/testimonials/${id}`, testimonialData);
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);
export const approveTestimonial = (id) => api.put(`/testimonials/${id}/approve`);

// Contact API calls
export const submitContact = (contactData) => api.post('/contact', contactData);
export const getMessages = () => api.get('/messages');
export const getMessage = (id) => api.get(`/messages/${id}`);
export const markMessageAsRead = (id) => api.put(`/messages/${id}/read`);
export const deleteMessage = (id) => api.delete(`/messages/${id}`);
export const replyToMessage = (id, replyData) => api.post(`/messages/${id}/reply`, replyData);

// Settings API calls
export const getSettings = async () => {
  try {
    // Create a direct axios request without the interceptor
    const response = await axios.get(`${API_URL}/settings`);
    return response;
  } catch (error) {
    console.error('Error fetching settings:', error);
    // Return default settings on error
    return {
      data: {
        data: {
          siteName: 'My Portfolio',
          siteDescription: 'Welcome to my portfolio website',
          primaryColor: '#3f51b5',
          secondaryColor: '#f50057',
          darkMode: false,
          showResume: true,
          showProjects: true,
          showBlog: true,
          showTestimonials: true,
          showContact: true
        }
      }
    };
  }
};
export const updateSettings = (settingsData) => api.put('/settings', settingsData);

// Social Links API calls
export const getSocialLinks = () => api.get('/social-links');
export const updateSocialLinks = (socialLinksData) => api.put('/social-links', socialLinksData);

// Stats API calls
export const getStats = () => api.get('/admin/stats');
export const getVisitorStats = (period) => api.get(`/admin/stats/visitors?period=${period}`);
export const getPageViewStats = (period) => api.get(`/admin/stats/pageviews?period=${period}`);

// Search API call
export const search = (query) => api.get(`/search?q=${query}`);

export default api; 