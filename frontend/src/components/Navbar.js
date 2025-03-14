import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Container, 
  useScrollTrigger, 
  Slide,
  Divider,
  useTheme,
  useMediaQuery,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  Switch
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

// Hide AppBar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, user, logout } = useAuth();
  const { settings, updateSettings } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Create menu items based on settings
  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Projects', path: '/projects', show: settings.showProjects },
    { text: 'Blog', path: '/blog', show: settings.showBlog },
    { text: 'Resume', path: '/resume', show: settings.showResume },
    { text: 'Contact', path: '/contact', show: settings.showContact }
  ].filter(item => item.show !== false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleAdminDashboard = () => {
    navigate('/admin/dashboard');
    handleMenuClose();
  };

  const handleThemeToggle = () => {
    updateSettings({ darkMode: !settings.darkMode });
  };

  // Check if we're on the homepage to determine if we should use transparent navbar
  const isHomePage = location.pathname === '/';

  // Add scroll listener to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Drawer content
  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          {settings.siteName || 'My Portfolio'}
        </Typography>
        <Box>
          <Tooltip title={settings.darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <IconButton onClick={handleThemeToggle} color="inherit">
              {settings.darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={RouterLink} 
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {isAuthenticated ? (
          <>
            <ListItem>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
            {user.role === 'admin' && (
              <ListItem 
                button 
                component={RouterLink} 
                to="/admin/dashboard"
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Admin Dashboard" />
              </ListItem>
            )}
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={handleLogin}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button onClick={handleRegister}>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar 
          position="fixed" 
          color="inherit" 
          elevation={scrolled ? 4 : 0}
          sx={{ 
            backgroundColor: isHomePage && !scrolled 
              ? 'transparent' 
              : 'background.paper',
            borderBottom: scrolled ? 1 : 0,
            borderColor: 'divider',
            transition: 'background-color 0.3s ease'
          }}
        >
          <Container>
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  color: isHomePage && !scrolled ? 'white' : 'primary.main',
                  textDecoration: 'none',
                  letterSpacing: '.1rem',
                }}
              >
                {settings.siteName || 'My Portfolio'}
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleDrawerToggle}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>

              <Typography
                variant="h6"
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontWeight: 700,
                  color: isHomePage && !scrolled ? 'white' : 'primary.main',
                  textDecoration: 'none',
                  letterSpacing: '.1rem',
                }}
              >
                {settings.siteName || 'My Portfolio'}
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    sx={{ 
                      my: 2, 
                      mx: 1,
                      color: isHomePage && !scrolled ? 'white' : 'text.primary',
                      '&:hover': {
                        color: 'primary.main',
                      },
                      ...(location.pathname === item.path && {
                        color: 'primary.main',
                        fontWeight: 'bold',
                      })
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title={settings.darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                  <IconButton onClick={handleThemeToggle} color="inherit" sx={{ ml: 1 }}>
                    {settings.darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Tooltip>

                {isAuthenticated ? (
                  <>
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleMenuOpen}
                        size="small"
                        sx={{ ml: 1 }}
                        aria-controls="account-menu"
                        aria-haspopup="true"
                      >
                        <AccountCircleIcon />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      id="account-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <MenuItem onClick={handleMenuClose}>
                        <Typography variant="body1">{user.name}</Typography>
                      </MenuItem>
                      <Divider />
                      
                      {/* Show Admin Dashboard only for admin users */}
                      {user.role === 'admin' && (
                        <MenuItem 
                          component={RouterLink} 
                          to="/admin/dashboard" 
                          onClick={handleMenuClose}
                        >
                          <ListItemIcon>
                            <DashboardIcon fontSize="small" />
                          </ListItemIcon>
                          Admin Dashboard
                        </MenuItem>
                      )}
                      
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  !isMobile && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button 
                        color="inherit" 
                        onClick={handleLogin}
                        sx={{ ml: 1 }}
                      >
                        Login
                      </Button>
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={handleRegister}
                        sx={{ 
                          ml: 1,
                          borderRadius: 2,
                          boxShadow: 'none',
                          '&:hover': {
                            boxShadow: 'none',
                          }
                        }}
                      >
                        Register
                      </Button>
                    </Box>
                  )
                )}

                {/* Mobile menu button */}
                {isMobile && (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Toolbar placeholder to prevent content from hiding behind the AppBar */}
      <Toolbar />
    </>
  );
};

export default Navbar; 