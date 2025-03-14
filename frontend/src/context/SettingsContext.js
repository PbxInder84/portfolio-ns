import React, { createContext, useState, useContext, useEffect } from 'react';
import { getSettings, updateSettings } from '../services/settingsApi';

// Create the context
const SettingsContext = createContext();

// Create a custom hook to use the settings context
export const useSettings = () => useContext(SettingsContext);

// Provider component
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    // Try to get settings from localStorage first
    const savedSettings = localStorage.getItem('portfolioSettings');
    if (savedSettings) {
      try {
        return JSON.parse(savedSettings);
      } catch (e) {
        console.error('Error parsing saved settings:', e);
      }
    }
    
    // Default settings if nothing in localStorage
    return {
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
    };
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await getSettings();
        
        // Check if the response has the expected structure
        const settingsData = response.data.data || response.data;
        
        if (settingsData) {
          setSettings(settingsData);
          // Save to localStorage for persistence
          localStorage.setItem('portfolioSettings', JSON.stringify(settingsData));
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        // Keep using default or localStorage settings on error
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Function to update settings (for admin)
  const updateSettingsData = async (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    // Save to localStorage for persistence
    localStorage.setItem('portfolioSettings', JSON.stringify(updatedSettings));
    
    // If this is an admin action, also update on the server
    try {
      await updateSettings(newSettings);
    } catch (error) {
      console.error('Error updating settings on server:', error);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, updateSettings: updateSettingsData }}>
      {children}
    </SettingsContext.Provider>
  );
}; 