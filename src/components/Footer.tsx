import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  School as SchoolIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Countries', href: '#countries' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'University Admissions',
    'Visa & Immigration',
    'Language Training',
    'Documentation Services',
    'Career Guidance',
    'Student Support',
  ];

  const countries = [
    'United Kingdom',
    'United States',
    'Germany',
    'Australia',
    'Canada',
    'Netherlands',
  ];

  const socialMedia = [
    {
      name: 'Facebook',
      icon: <FacebookIcon />,
      url: 'https://facebook.com/rnbridge',
      color: '#1877f2',
    },
    {
      name: 'Instagram',
      icon: <InstagramIcon />,
      url: 'https://instagram.com/rnbridge',
      color: '#e4405f',
    },
    {
      name: 'LinkedIn',
      icon: <LinkedInIcon />,
      url: 'https://linkedin.com/company/rnbridge',
      color: '#0077b5',
    },
    {
      name: 'Twitter',
      icon: <TwitterIcon />,
      url: 'https://twitter.com/rnbridge',
      color: '#1da1f2',
    },
    {
      name: 'WhatsApp',
      icon: <WhatsAppIcon />,
      url: 'https://wa.me/442012345678',
      color: '#25d366',
    },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#000000',
        color: 'white',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <SchoolIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  RNBRIDGE LTD
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                Your trusted partner in international education, connecting ambitious students with world-class opportunities since 2008.
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PhoneIcon sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">
                    +44 20 1234 5678
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">
                    info@rnbridge.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">
                    6274 58 Peregrine Road, Hainault, Ilford, Essex, United Kingdom, IG6 3SZ
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialMedia.map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconButton
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: social.color,
                        },
                      }}
                      onClick={() => window.open(social.url, '_blank')}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    component="button"
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      textDecoration: 'none',
                      textAlign: 'left',
                      '&:hover': {
                        color: 'white',
                      },
                    }}
                    onClick={() => scrollToSection(link.href)}
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Our Services
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {services.map((service, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      '&:hover': {
                        color: 'white',
                      },
                    }}
                  >
                    {service}
                  </Typography>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Study Destinations
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {countries.map((country, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      '&:hover': {
                        color: 'white',
                      },
                    }}
                  >
                    {country}
                  </Typography>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              © 2024 RNBRIDGE LTD. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link
                component="button"
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'white',
                  },
                }}
              >
                Privacy Policy
              </Link>
              <Link
                component="button"
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'white',
                  },
                }}
              >
                Terms of Service
              </Link>
              <Link
                component="button"
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'white',
                  },
                }}
              >
                Cookie Policy
              </Link>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer; 