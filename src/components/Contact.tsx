import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Chip,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  WhatsApp as WhatsAppIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country_of_interest: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5001/api/contact/submit', formData);
      
      if (response.data.success) {
        setSnackbar({
          open: true,
          message: 'Message sent successfully! We will get back to you within 24 hours.',
          severity: 'success',
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          country_of_interest: '',
          message: '',
        });
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to send message. Please try again.',
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const contactInfo = [
    {
      icon: <PhoneIcon sx={{ fontSize: 30, color: 'primary.main' }} />,
      title: 'Phone',
      details: ['+44 20 1234 5678', '+1 555 123 4567'],
      action: 'tel:+442012345678',
    },
    {
      icon: <EmailIcon sx={{ fontSize: 30, color: '#000000' }} />,
      title: 'Email',
      details: ['info@rnbridge.com', 'admissions@rnbridge.com'],
      action: 'mailto:info@rnbridge.com',
    },
    {
      icon: <LocationIcon sx={{ fontSize: 30, color: 'primary.main' }} />,
      title: 'Office',
      details: ['6274 58 Peregrine Road', 'Hainault, Ilford, Essex, United Kingdom, IG6 3SZ'],
      action: 'https://maps.google.com',
    },
    {
      icon: <WhatsAppIcon sx={{ fontSize: 30, color: '#000000' }} />,
      title: 'WhatsApp',
      details: ['+44 20 1234 5678', 'Available 24/7'],
      action: 'https://wa.me/442012345678',
    },
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
  ];

  return (
    <Box
      id="contact"
      sx={{
        py: 8,
        backgroundColor: 'background.paper',
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
                  background: 'linear-gradient(135deg, #1976d2 0%, #000000 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Get In Touch
              </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Ready to start your international education journey? Contact us today for a free consultation.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                Contact Information
              </Typography>
              
              <Grid container spacing={3}>
                {contactInfo.map((info, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card
                        sx={{
                          height: '100%',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3, textAlign: 'center' }}>
                          <Box sx={{ mb: 2 }}>
                            {info.icon}
                          </Box>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            {info.title}
                          </Typography>
                          {info.details.map((detail, detailIndex) => (
                            <Typography
                              key={detailIndex}
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 0.5 }}
                            >
                              {detail}
                            </Typography>
                          ))}
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ mt: 2 }}
                            onClick={() => window.open(info.action, '_blank')}
                          >
                            Contact
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {socialMedia.map((social, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        sx={{
                          backgroundColor: social.color,
                          color: 'white',
                          '&:hover': {
                            backgroundColor: social.color,
                            transform: 'translateY(-2px)',
                          },
                        }}
                        onClick={() => window.open(social.url, '_blank')}
                      >
                        {social.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </Box>
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
              <Card sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                  Send Us a Message
                </Typography>
                
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Country of Interest"
                        name="country_of_interest"
                        value={formData.country_of_interest}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          disabled={isSubmitting}
                          endIcon={isSubmitting ? null : <SendIcon />}
                          sx={{
                            py: 1.5,
                            fontSize: '1.1rem',
                            background: 'linear-gradient(135deg, #1976d2 0%, #2e7d32 100%)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #1565c0 0%, #1b5e20 100%)',
                            },
                          }}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </motion.div>
                    </Grid>
                  </Grid>
                </form>

                <Divider sx={{ my: 4 }} />
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Office Hours
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Monday - Friday: 9:00 AM - 6:00 PM GMT
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Saturday: 10:00 AM - 4:00 PM GMT
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sunday: Closed
                  </Typography>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Ready to Start Your Journey?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Get a free consultation and personalized guidance for your international education goals.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<WhatsAppIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: '#25d366',
                  '&:hover': {
                    background: '#128c7e',
                  },
                }}
                onClick={() => window.open('https://wa.me/442012345678', '_blank')}
              >
                WhatsApp Chat
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<PhoneIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
                onClick={() => window.open('tel:+442012345678', '_blank')}
              >
                Call Now
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact; 