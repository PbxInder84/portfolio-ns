import axios from 'axios';
import api from './api';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get settings (public)
export const getSettings = async () => {
  try {
    console.log('Fetching settings from:', `${API_URL}/settings`);
    const response = await axios.get(`${API_URL}/settings`);
    console.log('Settings response:', response);
    return response;
  } catch (error) {
    console.error('Error fetching settings:', error);
    // Return default settings on error
    return {
      data: {
        data: {
          siteName: 'My Portfolio',
          siteDescription: 'Welcome to my portfolio website',
          siteKeywords: ['portfolio', 'developer', 'web'],
          email: '',
          phone: '',
          address: '',
          socialLinks: {
            github: '',
            linkedin: '',
            twitter: '',
            facebook: '',
            instagram: '',
            youtube: ''
          },
          primaryColor: '#3f51b5',
          secondaryColor: '#f50057',
          fontFamily: 'Roboto, sans-serif',
          logo: '',
          favicon: '',
          darkMode: false,
          showResume: true,
          showProjects: true,
          showBlog: true,
          showTestimonials: true,
          showContact: true,
          googleAnalyticsId: '',
          metaImage: ''
        }
      }
    };
  }
};

// Update settings (admin only)
export const updateSettings = (data) => {
  return api.put('/settings', data);
};

// Upload logo (admin only)
export const uploadLogo = (formData) => {
  return api.post('/settings/logo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Upload favicon (admin only)
export const uploadFavicon = (formData) => {
  return api.post('/settings/favicon', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Upload meta image (admin only)
export const uploadMetaImage = (formData) => {
  return api.post('/settings/meta-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}; 