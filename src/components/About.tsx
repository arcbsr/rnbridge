import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  EmojiEvents as TrophyIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  TrendingUp as GrowthIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const stats = [
    { number: '5000+', label: 'Students Placed', icon: <PeopleIcon /> },
    { number: '50+', label: 'Partner Universities', icon: <SchoolIcon /> },
    { number: '95%', label: 'Success Rate', icon: <TrophyIcon /> },
    { number: '15+', label: 'Years Experience', icon: <GrowthIcon /> },
  ];

  const values = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Trust & Reliability',
      description: 'Building lasting relationships through transparent and reliable services.',
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Student-Centric Approach',
      description: 'Every decision is made with the student\'s best interests in mind.',
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Educational Excellence',
      description: 'Partnering with world-class institutions to provide the best opportunities.',
    },
  ];

  return (
    <Box
      id="about"
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
              About RNBRIDGE LTD
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}
            >
              Your trusted partner in international education, connecting ambitious students with world-class opportunities since 2008.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem' }}>
                At RNBRIDGE LTD, we believe that education is the key to unlocking global opportunities. 
                Our mission is to bridge the gap between ambitious students and world-class educational institutions, 
                providing comprehensive support throughout their international education journey.
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem' }}>
                We specialize in connecting students with top universities in the UK, USA, Germany, Australia, 
                Canada, and other leading study destinations, ensuring a smooth transition from application to graduation.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip label="ISO Certified" color="primary" />
                <Chip label="15+ Years Experience" color="secondary" />
                <Chip label="Global Network" color="primary" />
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #1976d2 0%, #2e7d32 100%)' }}>
                <CardContent sx={{ p: 4, color: 'white' }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Why Choose RNBRIDGE LTD?
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                        <SecurityIcon />
                      </Avatar>
                      <Typography variant="body1">
                        <strong>Trusted Partner:</strong> 15+ years of experience in international education
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                        <PeopleIcon />
                      </Avatar>
                      <Typography variant="body1">
                        <strong>Expert Team:</strong> Certified education consultants and immigration experts
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                        <SchoolIcon />
                      </Avatar>
                      <Typography variant="body1">
                        <strong>Global Network:</strong> Direct partnerships with 50+ universities worldwide
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                        <SupportIcon />
                      </Avatar>
                      <Typography variant="body1">
                        <strong>24/7 Support:</strong> Round-the-clock assistance for students
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
              Our Achievements
            </Typography>
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card sx={{ textAlign: 'center', p: 3 }}>
                      <Box sx={{ color: 'primary.main', mb: 2 }}>
                        {stat.icon}
                      </Box>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        {stat.number}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
              Our Values
            </Typography>
            <Grid container spacing={4}>
              {values.map((value, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card sx={{ height: '100%', p: 4, textAlign: 'center' }}>
                      <Box sx={{ mb: 3 }}>
                        {value.icon}
                      </Box>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        {value.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {value.description}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About; 