import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, refreshToken } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        // Try to get current user with existing token
        const response = await getCurrentUser();
        setUser(response.data.data);
        setIsAuthenticated(true);
      } catch (error) {
        // If token is expired, try to refresh it
        try {
          const refreshResponse = await refreshToken();
          localStorage.setItem('token', refreshResponse.data.token);
          
          // Get user data with new token
          const userResponse = await getCurrentUser();
          setUser(userResponse.data.data);
          setIsAuthenticated(true);
        } catch (refreshError) {
          // If refresh fails, clear token
          localStorage.removeItem('token');
          setUser(null);
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  // Login function
  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    
    // Store user data including role
    const user = {
      id: userData.user.id,
      name: userData.user.name,
      email: userData.user.email,
      role: userData.user.role || 'user' // Default to user if role is not provided
    };
    
    setUser(user);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update user data
  const updateUser = (newUserData) => {
    setUser(prev => ({ ...prev, ...newUserData }));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 