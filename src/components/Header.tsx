import React, { useState } from 'react';
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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon, School as SchoolIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Home', href: '#home' },
    { text: 'Services', href: '#services' },
    { text: 'Countries', href: '#countries' },
    { text: 'About', href: '#about' },
    { text: 'Contact', href: '#contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        RNBRIDGE LTD
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} onClick={() => scrollToSection(item.href)}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <AppBar position="fixed" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <SchoolIcon sx={{ color: 'primary.main', mr: 1, fontSize: 32 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
              }}
            >
              RNBRIDGE LTD
            </Typography>
          </Box>

          {isMobile ? (
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="primary"
                  onClick={() => scrollToSection(item.href)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'white',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      <Toolbar /> {/* Spacer for fixed AppBar */}
    </motion.div>
  );
};

export default Header; 