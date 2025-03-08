import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if user is authenticated
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors globally
    if (error.response?.status === 401) {
      // Clear token if it's invalid
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const getProjects = () => api.get('/projects');
export const getProfile = () => api.get('/user/profile');
export const submitContact = (data) => api.post('/contact/submit', data);
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);

export default api; 