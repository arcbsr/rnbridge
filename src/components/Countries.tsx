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
  Avatar,
  Rating,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  School as SchoolIcon,
  Work as WorkIcon,
  Language as LanguageIcon,
  Euro as EuroIcon,
  Flag as FlagIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  CheckCircle as CheckIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Countries: React.FC = () => {
  const countries = [
    {
      name: 'United Kingdom',
      flag: '🇬🇧',
      description: 'Home to world-renowned universities like Oxford, Cambridge, and Imperial College London.',
      universities: ['Oxford University', 'Cambridge University', 'Imperial College', 'LSE'],
      features: ['English Language', 'Work Opportunities', 'Rich History', 'Global Recognition'],
      color: '#1f4e79',
      gradient: 'linear-gradient(135deg, #1f4e79 0%, #2d5a8b 100%)',
      stats: { students: '45,000+', success: '98%', duration: '3-4 years' },
      rating: 4.9,
      testimonials: 'Sarah from Bangladesh',
      cost: '£9,250/year',
      duration: '3-4 years',
    },
    {
      name: 'United States',
      flag: '🇺🇸',
      description: 'Leading destination for higher education with top-ranked universities and diverse programs.',
      universities: ['Harvard University', 'MIT', 'Stanford University', 'Yale University'],
      features: ['Innovation Hub', 'Research Opportunities', 'Diverse Culture', 'Career Growth'],
      color: '#b22234',
      gradient: 'linear-gradient(135deg, #b22234 0%, #dc143c 100%)',
      stats: { students: '52,000+', success: '96%', duration: '4 years' },
      rating: 4.8,
      testimonials: 'Ahmed from Egypt',
      cost: '$35,000/year',
      duration: '4 years',
    },
    {
      name: 'Germany',
      flag: '🇩🇪',
      description: 'Excellent education system with many programs offered in English and low tuition fees.',
      universities: ['Technical University Munich', 'Heidelberg University', 'LMU Munich', 'RWTH Aachen'],
      features: ['Low Tuition', 'Strong Economy', 'Research Focus', 'EU Benefits'],
      color: '#dd0000',
      gradient: 'linear-gradient(135deg, #dd0000 0%, #ff0000 100%)',
      stats: { students: '38,000+', success: '97%', duration: '3 years' },
      rating: 4.7,
      testimonials: 'Maria from Brazil',
      cost: '€300/semester',
      duration: '3 years',
    },
    {
      name: 'Australia',
      flag: '🇦🇺',
      description: 'High-quality education with beautiful campuses and excellent post-study work opportunities.',
      universities: ['University of Melbourne', 'Australian National University', 'University of Sydney', 'Monash University'],
      features: ['Work Rights', 'Quality of Life', 'Research Excellence', 'Global Recognition'],
      color: '#012169',
      gradient: 'linear-gradient(135deg, #012169 0%, #1e3a8a 100%)',
      stats: { students: '42,000+', success: '95%', duration: '3-4 years' },
      rating: 4.6,
      testimonials: 'James from India',
      cost: 'AUD 35,000/year',
      duration: '3-4 years',
    },
    {
      name: 'Canada',
      flag: '🇨🇦',
      description: 'Welcoming environment with excellent education quality and immigration opportunities.',
      universities: ['University of Toronto', 'McGill University', 'University of British Columbia', 'University of Waterloo'],
      features: ['Immigration Friendly', 'Quality Education', 'Safe Environment', 'Work Permits'],
      color: '#ff0000',
      gradient: 'linear-gradient(135deg, #ff0000 0%, #dc143c 100%)',
      stats: { students: '35,000+', success: '94%', duration: '4 years' },
      rating: 4.8,
      testimonials: 'Lina from Colombia',
      cost: 'CAD 25,000/year',
      duration: '4 years',
    },
    {
      name: 'Netherlands',
      flag: '🇳🇱',
      description: 'Innovative education system with many English-taught programs and international focus.',
      universities: ['University of Amsterdam', 'Delft University', 'Leiden University', 'Erasmus University'],
      features: ['English Programs', 'Innovation Hub', 'EU Benefits', 'Quality Education'],
      color: '#ae1c28',
      gradient: 'linear-gradient(135deg, #ae1c28 0%, #c41e3a 100%)',
      stats: { students: '28,000+', success: '96%', duration: '3 years' },
      rating: 4.5,
      testimonials: 'Elena from Russia',
      cost: '€2,168/year',
      duration: '3 years',
    },
  ];

  const globalStats = [
    { number: '250,000+', label: 'Students Placed', icon: <PeopleIcon /> },
    { number: '95%', label: 'Success Rate', icon: <CheckIcon /> },
    { number: '50+', label: 'Partner Countries', icon: <FlagIcon /> },
    { number: '15+', label: 'Years Experience', icon: <TrendingUpIcon /> },
  ];

  return (
    <Box
      id="countries"
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%231976d2" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        },
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
            <Chip
              label="Popular Destinations"
              color="primary"
              sx={{ mb: 2, px: 2, py: 1 }}
            />
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
              Study Destinations
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
            >
              Explore world-class education opportunities in leading countries across the globe
            </Typography>
          </Box>
        </motion.div>

        {/* Global Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {globalStats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(25, 118, 210, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(25, 118, 210, 0.15)',
                    },
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 1 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <Grid container spacing={4}>
          {countries.map((country, index) => (
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
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '6px',
                      background: country.gradient,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    {/* Header with Flag and Rating */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          variant="h1"
                          sx={{ fontSize: '3rem', mr: 2 }}
                        >
                          {country.flag}
                        </Typography>
                        <Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 600,
                              color: country.color,
                            }}
                          >
                            {country.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <Rating value={country.rating} readOnly size="small" />
                            <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                              ({country.rating})
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Chip
                        label="Popular"
                        size="small"
                        color="primary"
                        variant="outlined"
                        icon={<StarIcon />}
                      />
                    </Box>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 3, lineHeight: 1.6 }}
                    >
                      {country.description}
                    </Typography>

                    {/* Statistics */}
                    <Box sx={{ mb: 3, p: 2, background: 'rgba(25, 118, 210, 0.05)', borderRadius: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {country.stats.students}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Students
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
                            {country.stats.success}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Success Rate
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'warning.main' }}>
                            {country.stats.duration}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Duration
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Cost and Duration */}
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Average Cost
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                          {country.cost}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Duration
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {country.duration}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        Top Universities:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {country.universities.map((university, uniIndex) => (
                          <Chip
                            key={uniIndex}
                            label={university}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        Key Features:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {country.features.map((feature, featureIndex) => (
                          <Chip
                            key={featureIndex}
                            label={feature}
                            size="small"
                            color="secondary"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Testimonial */}
                    <Box sx={{ mb: 3, p: 2, background: 'rgba(255, 193, 7, 0.1)', borderRadius: 2, border: '1px solid rgba(255, 193, 7, 0.3)' }}>
                      <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                        "Amazing experience! {country.testimonials} got accepted to {country.universities[0]}"
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={<ArrowIcon />}
                      onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ 
                          behavior: 'smooth' 
                        });
                      }}
                      sx={{
                        background: country.gradient,
                        '&:hover': {
                          background: country.gradient,
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                        },
                      }}
                    >
                      Start Application
                    </Button>
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
          <Box sx={{ textAlign: 'center', mt: 8, p: 4, background: 'linear-gradient(135deg, #1976d2 0%, #2e7d32 100%)', borderRadius: 4, color: 'white' }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
              Ready to Start Your International Journey?
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
              Join thousands of successful students who have achieved their dreams with RNBRIDGE LTD
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Get Free Consultation
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Download Brochure
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Countries; 