const Settings = require('../models/Settings');

const initializeSettings = async () => {
  try {
    // Check if settings already exist
    const existingSettings = await Settings.findOne();
    
    if (!existingSettings) {
      console.log('No settings found. Creating default settings...');
      
      // Create default settings
      const defaultSettings = new Settings({
        siteName: 'My Portfolio',
        siteDescription: 'Welcome to my portfolio website',
        siteKeywords: ['portfolio', 'developer', 'web'],
        primaryColor: '#3f51b5',
        secondaryColor: '#f50057',
        darkMode: false,
        showResume: true,
        showProjects: true,
        showBlog: true,
        showTestimonials: true,
        showContact: true
      });
      
      await defaultSettings.save();
      console.log('Default settings created successfully');
    } else {
      console.log('Settings already exist in the database');
    }
  } catch (error) {
    console.error('Error initializing settings:', error);
  }
};

module.exports = initializeSettings; 