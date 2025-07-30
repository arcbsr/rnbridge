import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createTables, insertSampleData } from './config/database';
import contactRoutes from './routes/contact';
import studentRoutes from './routes/students';
import universityRoutes from './routes/universities';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database
const initializeDatabase = async () => {
  try {
    await createTables();
    await insertSampleData();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    console.log('⚠️  Server will continue without database initialization');
  }
};

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/universities', universityRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'RNBRIDGE LTD API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to RNBRIDGE LTD API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      students: '/api/students',
      universities: '/api/universities'
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: 'The requested endpoint does not exist' 
  });
});

app.listen(PORT, async () => {
  console.log(`🚀 RNBRIDGE LTD Server running on port ${PORT}`);
  console.log(`📧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  
  // Initialize database on server start
  await initializeDatabase();
});

export default app; 