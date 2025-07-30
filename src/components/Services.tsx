import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
} from '@mui/material';
import {
  School as SchoolIcon,
  Flight as FlightIcon,
  Language as LanguageIcon,
  Support as SupportIcon,
  Assignment as AssignmentIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  const services = [
    {
      icon: <SchoolIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
      title: 'University Admissions',
      description: 'Comprehensive guidance for undergraduate and postgraduate applications to top universities worldwide.',
      features: ['Application Strategy', 'Document Preparation', 'Personal Statement', 'Interview Coaching'],
      color: 'primary',
    },
    {
      icon: <FlightIcon sx={{ fontSize: 50, color: 'secondary.main' }} />,
      title: 'Visa & Immigration',
      description: 'Expert visa application support for student visas, work permits, and permanent residency.',
      features: ['Visa Application', 'Documentation', 'Interview Prep', 'Appeal Support'],
      color: 'secondary',
    },
    {
      icon: <LanguageIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
      title: 'Language Training',
      description: 'Professional language preparation for IELTS, TOEFL, PTE, and other international exams.',
      features: ['IELTS Training', 'TOEFL Prep', 'Speaking Practice', 'Mock Tests'],
      color: 'primary',
    },
    {
      icon: <AssignmentIcon sx={{ fontSize: 50, color: 'secondary.main' }} />,
      title: 'Documentation Services',
      description: 'Complete documentation support including transcript evaluation and credential assessment.',
      features: ['Transcript Evaluation', 'Credential Assessment', 'Document Translation', 'Notarization'],
      color: 'secondary',
    },
    {
      icon: <WorkIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
      title: 'Career Guidance',
      description: 'Professional career counseling and job placement assistance for international students.',
      features: ['Career Planning', 'Resume Building', 'Job Search', 'Networking'],
      color: 'primary',
    },
    {
      icon: <SupportIcon sx={{ fontSize: 50, color: 'secondary.main' }} />,
      title: 'Student Support',
      description: '24/7 support services including accommodation, airport pickup, and cultural orientation.',
      features: ['Accommodation', 'Airport Pickup', 'Cultural Orientation', 'Emergency Support'],
      color: 'secondary',
    },
  ];

  return (
    <Box
      id="services"
      sx={{
        py: 8,
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #1976d2 0%, #2e7d32 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Our Professional Services
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Comprehensive support for your international education journey, from application to graduation
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      {service.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2,
                        fontWeight: 600,
                        textAlign: 'center',
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 3, textAlign: 'center' }}
                    >
                      {service.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                      {service.features.map((feature, featureIndex) => (
                        <Chip
                          key={featureIndex}
                          label={feature}
                          size="small"
                          color={service.color as any}
                          variant="outlined"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, #1976d2 0%, #2e7d32 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0 0%, #1b5e20 100%)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Get Started Today
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Services; 