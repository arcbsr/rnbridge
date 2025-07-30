# RNBRIDGE LTD - International Student Admissions Website

A professional React-based landing page for RNBRIDGE LTD, specializing in international student admissions with PostgreSQL backend integration.

## 🌟 Features

### Frontend (React + TypeScript + Material-UI)
- **Professional Design**: Modern, responsive design with blue and green color scheme
- **Animated Components**: Smooth animations using Framer Motion
- **Material-UI Integration**: Professional UI components and icons
- **Mobile Responsive**: Optimized for all device sizes
- **Interactive Sections**:
  - Hero section with call-to-action
  - Services showcase
  - Country destinations (UK, USA, Germany, Australia, Canada, Netherlands)
  - About section with company information
  - Contact form with social media integration
  - Professional footer

### Backend (Node.js + Express + PostgreSQL)
- **RESTful API**: Complete CRUD operations
- **PostgreSQL Database**: Robust data management
- **Email Integration**: Automated email notifications
- **Contact Management**: Inquiry tracking and management
- **Student Applications**: Application processing system
- **University Database**: Comprehensive university information

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rnbridge-website
   ```

2. **Install frontend dependencies**
   ```bash
   cd rnbridge-website
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb rnbridge_db
   
   # Or using psql
   psql -U postgres
   CREATE DATABASE rnbridge_db;
   ```

5. **Configure environment variables**
   ```bash
   # Copy example environment file
   cp backend/env.example backend/.env
   
   # Edit the .env file with your database and email credentials
   ```

6. **Start the development servers**

   **Terminal 1 - Frontend:**
   ```bash
   cd rnbridge-website
   npm start
   ```

   **Terminal 2 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```

## 📁 Project Structure

```
rnbridge-website/
├── public/                 # Static files
├── src/
│   ├── components/         # React components
│   │   ├── Header.tsx     # Navigation header
│   │   ├── Hero.tsx       # Landing hero section
│   │   ├── Services.tsx   # Services showcase
│   │   ├── Countries.tsx  # Study destinations
│   │   ├── About.tsx      # Company information
│   │   ├── Contact.tsx    # Contact form
│   │   └── Footer.tsx     # Footer section
│   ├── App.tsx            # Main app component
│   └── index.tsx          # Entry point
├── backend/
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utility functions
│   │   └── server.ts      # Main server file
│   └── package.json
└── README.md
```

## 🎨 Design Features

### Color Scheme
- **Primary Blue**: #1976d2 (Trust, Professionalism)
- **Secondary Green**: #2e7d32 (Growth, Education)
- **Gradients**: Professional blue-to-green gradients

### Typography
- **Font Family**: Roboto (Material-UI default)
- **Responsive**: Optimized for all screen sizes
- **Hierarchy**: Clear typography scale

### Animations
- **Framer Motion**: Smooth page transitions
- **Hover Effects**: Interactive element animations
- **Scroll Animations**: Reveal animations on scroll

## 📊 Database Schema

### Tables
- **students**: Student application data
- **universities**: University information and programs
- **contact_inquiries**: Contact form submissions
- **services**: Available services
- **testimonials**: Student testimonials

### Sample Data
- 5 top universities (Oxford, Harvard, TUM, Melbourne, Toronto)
- 6 professional services
- 5 student testimonials

## 🔧 API Endpoints

### Contact
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/inquiries` - Get all inquiries
- `PATCH /api/contact/inquiries/:id/status` - Update inquiry status

### Students
- `POST /api/students/apply` - Submit student application
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `PATCH /api/students/:id/status` - Update student status

### Universities
- `GET /api/universities` - Get all universities
- `GET /api/universities/:id` - Get university by ID
- `GET /api/universities/country/:country` - Get universities by country
- `GET /api/universities/program/:program` - Get universities by program

## 📧 Email Integration

### Email Templates
- **Contact Form Notification**: Admin notification for new inquiries
- **Confirmation Email**: User confirmation for contact submissions
- **Student Application**: Application confirmation emails

### Configuration
- **SMTP**: Gmail SMTP support
- **Templates**: Professional HTML email templates
- **Automation**: Automatic email sending on form submissions

## 🌐 Social Media Integration

### Platforms
- **WhatsApp**: Direct messaging integration
- **Facebook**: Company page links
- **Instagram**: Social media presence
- **LinkedIn**: Professional networking
- **Twitter**: Social media updates

### Contact Methods
- **Phone**: +44 20 1234 5678
- **Email**: info@rnbridge.com
- **Office**: 123 Education Street, London, UK

## 🚀 Deployment

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to hosting service (Netlify, Vercel, etc.)
```

### Backend Deployment
```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

### Database Deployment
- Use PostgreSQL hosting service (AWS RDS, Heroku Postgres, etc.)
- Update environment variables for production
- Set up SSL connections

## 🔒 Security Features

- **CORS Configuration**: Proper cross-origin resource sharing
- **Input Validation**: Server-side validation for all forms
- **SQL Injection Prevention**: Parameterized queries
- **Environment Variables**: Secure configuration management

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: > 960px

### Features
- **Mobile Navigation**: Hamburger menu for mobile
- **Touch-Friendly**: Optimized for touch devices
- **Fast Loading**: Optimized images and animations

## 🎯 SEO Features

- **Meta Tags**: Proper meta descriptions and titles
- **Semantic HTML**: Proper heading structure
- **Alt Text**: Image accessibility
- **Structured Data**: Schema markup for better search results

## 📈 Analytics Integration

Ready for integration with:
- **Google Analytics**: Track user behavior
- **Facebook Pixel**: Social media tracking
- **Hotjar**: User experience analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and inquiries:
- **Email**: info@rnbridge.com
- **Phone**: +44 20 1234 5678
- **WhatsApp**: +44 20 1234 5678

---

**RNBRIDGE LTD** - Your Gateway to Global Education 🌍
