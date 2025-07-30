import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

// Debug environment variables
console.log('🔍 Database Config Debug:');
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);

// Database connection pool
export const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'rnbridge_db',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Database schema creation
export const createTables = async () => {
  const client = await pool.connect();
  
  try {
    // Create students table
    await client.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        country_of_origin VARCHAR(100),
        desired_country VARCHAR(100),
        desired_program VARCHAR(200),
        education_level VARCHAR(50),
        english_level VARCHAR(20),
        budget_range VARCHAR(50),
        message TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create universities table
    await client.query(`
      CREATE TABLE IF NOT EXISTS universities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        country VARCHAR(100) NOT NULL,
        city VARCHAR(100),
        ranking INTEGER,
        tuition_fee_min DECIMAL(10,2),
        tuition_fee_max DECIMAL(10,2),
        programs TEXT[],
        requirements TEXT,
        application_deadline DATE,
        website_url VARCHAR(255),
        contact_email VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create contact_inquiries table
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        country_of_interest VARCHAR(100),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create services table
    await client.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        price DECIMAL(10,2),
        duration VARCHAR(50),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create testimonials table
    await client.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        student_name VARCHAR(200) NOT NULL,
        country VARCHAR(100),
        university VARCHAR(200),
        program VARCHAR(200),
        testimonial TEXT NOT NULL,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        is_approved BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Database tables created successfully');
  } catch (error) {
    console.error('❌ Error creating database tables:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Insert sample data
export const insertSampleData = async () => {
  const client = await pool.connect();
  
  try {
    // Insert sample universities
    await client.query(`
      INSERT INTO universities (name, country, city, ranking, tuition_fee_min, tuition_fee_max, programs, requirements, website_url, contact_email) VALUES
      ('University of Oxford', 'United Kingdom', 'Oxford', 1, 25000, 35000, ARRAY['Computer Science', 'Business', 'Engineering'], 'IELTS 7.0, Strong academic background', 'https://www.ox.ac.uk', 'admissions@ox.ac.uk'),
      ('Harvard University', 'United States', 'Cambridge', 2, 45000, 55000, ARRAY['Computer Science', 'Business', 'Medicine'], 'TOEFL 100, SAT scores required', 'https://www.harvard.edu', 'admissions@harvard.edu'),
      ('Technical University of Munich', 'Germany', 'Munich', 50, 1500, 3000, ARRAY['Engineering', 'Computer Science', 'Business'], 'German B2 or English C1', 'https://www.tum.de', 'info@tum.de'),
      ('University of Melbourne', 'Australia', 'Melbourne', 41, 30000, 45000, ARRAY['Computer Science', 'Business', 'Arts'], 'IELTS 6.5, Academic transcripts', 'https://www.unimelb.edu.au', 'admissions@unimelb.edu.au'),
      ('University of Toronto', 'Canada', 'Toronto', 26, 35000, 50000, ARRAY['Computer Science', 'Business', 'Medicine'], 'IELTS 6.5, Academic excellence', 'https://www.utoronto.ca', 'admissions@utoronto.ca')
      ON CONFLICT DO NOTHING;
    `);

    // Insert sample services
    await client.query(`
      INSERT INTO services (name, description, price, duration) VALUES
      ('University Application', 'Complete university application support including document preparation and submission', 500, '2-4 weeks'),
      ('Visa Application', 'Comprehensive visa application assistance with document preparation', 300, '1-2 weeks'),
      ('Language Training', 'IELTS/TOEFL preparation courses with certified instructors', 200, '8-12 weeks'),
      ('Documentation Services', 'Transcript evaluation and credential assessment services', 150, '1 week'),
      ('Career Guidance', 'Professional career counseling and job placement assistance', 250, 'Ongoing'),
      ('Student Support', '24/7 support including accommodation and airport pickup', 100, 'Ongoing')
      ON CONFLICT DO NOTHING;
    `);

    // Insert sample testimonials
    await client.query(`
      INSERT INTO testimonials (student_name, country, university, program, testimonial, rating, is_approved) VALUES
      ('Ahmed Hassan', 'Egypt', 'University of Oxford', 'Computer Science', 'RNBRIDGE LTD made my dream of studying abroad a reality. Their professional guidance throughout the application process was invaluable.', 5, true),
      ('Maria Rodriguez', 'Spain', 'Harvard University', 'Business Administration', 'Excellent service from start to finish. The team was always available to answer my questions and provide support.', 5, true),
      ('Li Wei', 'China', 'Technical University of Munich', 'Engineering', 'The visa application process was smooth and efficient. Highly recommend their services for international students.', 5, true),
      ('Sarah Johnson', 'Nigeria', 'University of Melbourne', 'Computer Science', 'Professional, reliable, and trustworthy. They helped me secure admission to my dream university.', 5, true),
      ('David Kim', 'South Korea', 'University of Toronto', 'Medicine', 'Outstanding support throughout my application journey. The team is knowledgeable and caring.', 5, true)
      ON CONFLICT DO NOTHING;
    `);

    console.log('✅ Sample data inserted successfully');
  } catch (error) {
    console.error('❌ Error inserting sample data:', error);
    throw error;
  } finally {
    client.release();
  }
};

export default pool; 