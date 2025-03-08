import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Button,
  Paper
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import ProjectManager from './admin/ProjectManager';
import BlogManager from './admin/BlogManager';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const { logout } = useAuth();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Paper elevation={3}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h5">Admin Dashboard</Typography>
          <Button variant="outlined" color="primary" onClick={logout}>
            Logout
          </Button>
        </Box>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Projects" />
          <Tab label="Blog Posts" />
          <Tab label="Messages" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <ProjectManager />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <BlogManager />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6">Messages</Typography>
        {/* Add message management component here */}
      </TabPanel>
    </Paper>
  );
};

export default AdminDashboard; 