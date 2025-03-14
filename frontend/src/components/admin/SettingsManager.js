import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert,
  Paper,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Grid,
  Divider,
  Snackbar,
  IconButton,
  InputAdornment,
  Chip,
  Stack,
  Tabs,
  Tab,
  Avatar,
  Card,
  CardContent
} from '@mui/material';
import { 
  ColorLens as ColorLensIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Upload as UploadIcon,
  Save as SaveIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Tune as TuneIcon,
  Info as InfoIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { getSettings, updateSettings, uploadLogo, uploadFavicon, uploadMetaImage } from '../../services/settingsApi';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

// Tab Panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const SettingsManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState({
    logo: false,
    favicon: false,
    metaImage: false
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formValues, setFormValues] = useState({});
  const [newKeyword, setNewKeyword] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const { user } = useAuth();
  const { settings, updateSettings: updateContextSettings } = useSettings();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await getSettings();
        
        // The getSettings function now handles errors and returns default settings
        const settingsData = response.data.data || response.data;
        
        if (settingsData) {
          setFormValues(settingsData);
        }
        setError(null);
      } catch (error) {
        console.error('Error fetching settings:', error);
        setError('Failed to load settings. Using default values.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !formValues.siteKeywords.includes(newKeyword.trim())) {
      setFormValues({
        ...formValues,
        siteKeywords: [...formValues.siteKeywords, newKeyword.trim()]
      });
      setNewKeyword('');
    }
  };

  const handleDeleteKeyword = (keyword) => {
    setFormValues({
      ...formValues,
      siteKeywords: formValues.siteKeywords.filter(k => k !== keyword)
    });
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      socialLinks: {
        ...formValues.socialLinks,
        [name]: value
      }
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || user.role !== 'admin') {
      setError('You need admin privileges to update settings');
      return;
    }
    
    try {
      setSaving(true);
      const response = await updateSettings(formValues);
      
      // Update context with new settings
      updateContextSettings(response.data.data || response.data);
      
      setSuccessMessage('Settings updated successfully');
      setSuccess(true);
      setError(null);
    } catch (error) {
      console.error('Error updating settings:', error);
      setError('Failed to update settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (type, file) => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append(type, file);
    
    setUploading(prev => ({ ...prev, [type]: true }));
    
    try {
      let response;
      
      switch (type) {
        case 'logo':
          response = await uploadLogo(formData);
          break;
        case 'favicon':
          response = await uploadFavicon(formData);
          break;
        case 'metaImage':
          response = await uploadMetaImage(formData);
          break;
        default:
          throw new Error('Invalid upload type');
      }
      
      // Update form values with the new URL
      const data = response.data.data;
      setFormValues(prev => ({
        ...prev,
        [type]: data[type]
      }));
      
      setSuccessMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`);
      setSuccess(true);
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      setError(`Failed to upload ${type}. Please try again.`);
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Website Settings
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Paper elevation={0} sx={{ mb: 4, border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="settings tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<InfoIcon />} label="General" />
            <Tab icon={<PaletteIcon />} label="Appearance" />
            <Tab icon={<ShareIcon />} label="Social" />
            <Tab icon={<TuneIcon />} label="Features" />
            <Tab icon={<LanguageIcon />} label="SEO" />
          </Tabs>
        </Box>
        
        <form onSubmit={handleSubmit}>
          {/* General Settings */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">Site Information</Typography>
                <Divider sx={{ my: 1 }} />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Site Name"
                  name="siteName"
                  value={formValues.siteName || ''}
                  onChange={handleChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Site Description"
                  name="siteDescription"
                  value={formValues.siteDescription || ''}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Site Keywords
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Add Keyword"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddKeyword();
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton 
                            onClick={handleAddKeyword}
                            disabled={!newKeyword.trim()}
                          >
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
                
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {formValues.siteKeywords && formValues.siteKeywords.map((keyword, index) => (
                    <Chip
                      key={index}
                      label={keyword}
                      onDelete={() => handleDeleteKeyword(keyword)}
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Stack>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2 }}>Contact Information</Typography>
                <Divider sx={{ my: 1 }} />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formValues.email || ''}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formValues.phone || ''}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formValues.address || ''}
                  onChange={handleChange}
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* Appearance Settings */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">Colors & Branding</Typography>
                <Divider sx={{ my: 1 }} />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Primary Color"
                  name="primaryColor"
                  value={formValues.primaryColor || '#3f51b5'}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ColorLensIcon sx={{ color: formValues.primaryColor || '#3f51b5' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <input
                          type="color"
                          value={formValues.primaryColor || '#3f51b5'}
                          onChange={(e) => handleChange({
                            target: {
                              name: 'primaryColor',
                              value: e.target.value
                            }
                          })}
                          style={{ width: 30, height: 30, border: 'none' }}
                        />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Secondary Color"
                  name="secondaryColor"
                  value={formValues.secondaryColor || '#f50057'}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ColorLensIcon sx={{ color: formValues.secondaryColor || '#f50057' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <input
                          type="color"
                          value={formValues.secondaryColor || '#f50057'}
                          onChange={(e) => handleChange({
                            target: {
                              name: 'secondaryColor',
                              value: e.target.value
                            }
                          })}
                          style={{ width: 30, height: 30, border: 'none' }}
                        />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Font Family"
                  name="fontFamily"
                  value={formValues.fontFamily || 'Roboto, sans-serif'}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2 }}>Logo & Favicon</Typography>
                <Divider sx={{ my: 1 }} />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Logo
                    </Typography>
                    
                    {formValues.logo ? (
                      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                        <Avatar 
                          src={formValues.logo} 
                          alt="Logo" 
                          variant="square"
                          sx={{ width: 150, height: 'auto', maxHeight: 100 }}
                        />
                      </Box>
                    ) : (
                      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          No logo uploaded
                        </Typography>
                      </Box>
                    )}
                    
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<UploadIcon />}
                      disabled={uploading.logo}
                      fullWidth
                    >
                      {uploading.logo ? 'Uploading...' : 'Upload Logo'}
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFileUpload('logo', e.target.files[0])}
                      />
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Favicon
                    </Typography>
                    
                    {formValues.favicon ? (
                      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                        <Avatar 
                          src={formValues.favicon} 
                          alt="Favicon"
                          sx={{ width: 32, height: 32 }}
                        />
                      </Box>
                    ) : (
                      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          No favicon uploaded
                        </Typography>
                      </Box>
                    )}
                    
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<UploadIcon />}
                      disabled={uploading.favicon}
                      fullWidth
                    >
                      {uploading.favicon ? 'Uploading...' : 'Upload Favicon'}
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFileUpload('favicon', e.target.files[0])}
                      />
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValues.darkMode || false}
                      onChange={handleChange}
                      name="darkMode"
                    />
                  }
                  label="Enable Dark Mode by Default"
                />
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* Social Media Settings */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">Social Media Links</Typography>
                <Divider sx={{ my: 1 }} />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="GitHub"
                  name="github"
                  value={formValues.socialLinks?.github || ''}
                  onChange={handleSocialLinkChange}
                  placeholder="https://github.com/yourusername"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="LinkedIn"
                  name="linkedin"
                  value={formValues.socialLinks?.linkedin || ''}
                  onChange={handleSocialLinkChange}
                  placeholder="https://linkedin.com/in/yourusername"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Twitter"
                  name="twitter"
                  value={formValues.socialLinks?.twitter || ''}
                  onChange={handleSocialLinkChange}
                  placeholder="https://twitter.com/yourusername"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Facebook"
                  name="facebook"
                  value={formValues.socialLinks?.facebook || ''}
                  onChange={handleSocialLinkChange}
                  placeholder="https://facebook.com/yourusername"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Instagram"
                  name="instagram"
                  value={formValues.socialLinks?.instagram || ''}
                  onChange={handleSocialLinkChange}
                  placeholder="https://instagram.com/yourusername"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="YouTube"
                  name="youtube"
                  value={formValues.socialLinks?.youtube || ''}
                  onChange={handleSocialLinkChange}
                  placeholder="https://youtube.com/c/yourusername"
                />
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* Features Settings */}
          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">Toggle Features</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Enable or disable sections of your portfolio website
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValues.showResume || false}
                      onChange={handleChange}
                      name="showResume"
                    />
                  }
                  label="Show Resume"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValues.showProjects || false}
                      onChange={handleChange}
                      name="showProjects"
                    />
                  }
                  label="Show Projects"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValues.showBlog || false}
                      onChange={handleChange}
                      name="showBlog"
                    />
                  }
                  label="Show Blog"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValues.showTestimonials || false}
                      onChange={handleChange}
                      name="showTestimonials"
                    />
                  }
                  label="Show Testimonials"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValues.showContact || false}
                      onChange={handleChange}
                      name="showContact"
                    />
                  }
                  label="Show Contact"
                />
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* SEO Settings */}
          <TabPanel value={tabValue} index={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">SEO Settings</Typography>
                <Divider sx={{ my: 1 }} />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Google Analytics ID"
                  name="googleAnalyticsId"
                  value={formValues.googleAnalyticsId || ''}
                  onChange={handleChange}
                  placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Meta Image
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      This image will be used when sharing your website on social media
                    </Typography>
                    
                    {formValues.metaImage ? (
                      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                        <Box
                          component="img"
                          src={formValues.metaImage}
                          alt="Meta Image"
                          sx={{ maxWidth: '100%', maxHeight: 200 }}
                        />
                      </Box>
                    ) : (
                      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          No meta image uploaded
                        </Typography>
                      </Box>
                    )}
                    
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<UploadIcon />}
                      disabled={uploading.metaImage}
                      fullWidth
                    >
                      {uploading.metaImage ? 'Uploading...' : 'Upload Meta Image'}
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFileUpload('metaImage', e.target.files[0])}
                      />
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
          
          <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              startIcon={<SaveIcon />}
              disabled={saving || !user || user.role !== 'admin'}
              size="large"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </Box>
        </form>
      </Paper>
      
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default SettingsManager; 