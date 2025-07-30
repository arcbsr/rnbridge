import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  School as SchoolIcon,
  Flight as FlightIcon,
  Language as LanguageIcon,
  Support as SupportIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {

  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'University Admissions',
      description: 'Expert guidance for top universities worldwide',
    },
    {
      icon: <FlightIcon sx={{ fontSize: 40, color: '#ffffff' }} />,
      title: 'Visa Support',
      description: 'Complete visa application assistance',
    },
    {
      icon: <LanguageIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Language Training',
      description: 'IELTS, TOEFL, and language preparation',
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40, color: '#ffffff' }} />,
      title: '24/7 Support',
      description: 'Round-the-clock student support',
    },
  ];

  return (
    <Box
      id="home"
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #000000 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3,
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Your Gateway to
                <Box component="span" sx={{ color: '#ffffff', display: 'block' }}>
                  Global Education
                </Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  mb: 4,
                  fontWeight: 300,
                  lineHeight: 1.4,
                }}
              >
                RNBRIDGE LTD connects ambitious students with world-class education opportunities in the UK, USA, Germany, Australia, and beyond.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ 
                        behavior: 'smooth' 
                      });
                    }}
                    sx={{
                      backgroundColor: 'white',
                      color: 'primary.main',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Start Your Journey
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      document.getElementById('about')?.scrollIntoView({ 
                        behavior: 'smooth' 
                      });
                    }}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Grid container spacing={2}>
                {features.map((feature, index) => (
                  <Grid item xs={6} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <Card
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.95)',
                          backdropFilter: 'blur(10px)',
                          height: '100%',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                          },
                        }}
                      >
                        <CardContent sx={{ textAlign: 'center', p: 3 }}>
                          <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {feature.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero; 