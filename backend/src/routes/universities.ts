import express from 'express';
import { pool } from '../config/database';

const router = express.Router();

// Get all universities
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM universities 
       ORDER BY ranking ASC, name ASC`
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Error fetching universities:', error);
    res.status(500).json({
      error: 'Failed to fetch universities',
      message: 'Please try again later'
    });
  }
});

// Get university by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM universities WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'University not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error fetching university:', error);
    res.status(500).json({
      error: 'Failed to fetch university',
      message: 'Please try again later'
    });
  }
});

// Get universities by country
router.get('/country/:country', async (req, res) => {
  const { country } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM universities WHERE country = $1 ORDER BY ranking ASC',
      [country]
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Error fetching universities by country:', error);
    res.status(500).json({
      error: 'Failed to fetch universities',
      message: 'Please try again later'
    });
  }
});

// Get universities by program
router.get('/program/:program', async (req, res) => {
  const { program } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM universities 
       WHERE $1 = ANY(programs)
       ORDER BY ranking ASC`,
      [program]
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Error fetching universities by program:', error);
    res.status(500).json({
      error: 'Failed to fetch universities',
      message: 'Please try again later'
    });
  }
});

// Add new university (admin only)
router.post('/', async (req, res) => {
  const {
    name,
    country,
    city,
    ranking,
    tuition_fee_min,
    tuition_fee_max,
    programs,
    requirements,
    application_deadline,
    website_url,
    contact_email
  } = req.body;

  try {
    // Validate required fields
    if (!name || !country) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'University name and country are required'
      });
    }

    const result = await pool.query(
      `INSERT INTO universities (
        name, country, city, ranking, tuition_fee_min,
        tuition_fee_max, programs, requirements,
        application_deadline, website_url, contact_email
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        name, country, city, ranking, tuition_fee_min,
        tuition_fee_max, programs, requirements,
        application_deadline, website_url, contact_email
      ]
    );

    res.status(201).json({
      success: true,
      message: 'University added successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error adding university:', error);
    res.status(500).json({
      error: 'Failed to add university',
      message: 'Please try again later'
    });
  }
});

// Update university
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name,
    country,
    city,
    ranking,
    tuition_fee_min,
    tuition_fee_max,
    programs,
    requirements,
    application_deadline,
    website_url,
    contact_email
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE universities 
       SET name = $1, country = $2, city = $3, ranking = $4,
           tuition_fee_min = $5, tuition_fee_max = $6, programs = $7,
           requirements = $8, application_deadline = $9,
           website_url = $10, contact_email = $11
       WHERE id = $12 
       RETURNING *`,
      [
        name, country, city, ranking, tuition_fee_min,
        tuition_fee_max, programs, requirements,
        application_deadline, website_url, contact_email, id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'University not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error updating university:', error);
    res.status(500).json({
      error: 'Failed to update university',
      message: 'Please try again later'
    });
  }
});

// Delete university
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM universities WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'University not found'
      });
    }

    res.json({
      success: true,
      message: 'University deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting university:', error);
    res.status(500).json({
      error: 'Failed to delete university',
      message: 'Please try again later'
    });
  }
});

// Search universities
router.get('/search/:query', async (req, res) => {
  const { query } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM universities 
       WHERE name ILIKE $1 OR country ILIKE $1 OR city ILIKE $1
       ORDER BY ranking ASC`,
      [`%${query}%`]
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Error searching universities:', error);
    res.status(500).json({
      error: 'Failed to search universities',
      message: 'Please try again later'
    });
  }
});

// Get universities by budget range
router.get('/budget/:min/:max', async (req, res) => {
  const { min, max } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM universities 
       WHERE tuition_fee_min >= $1 AND tuition_fee_max <= $2
       ORDER BY tuition_fee_min ASC`,
      [parseFloat(min), parseFloat(max)]
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Error fetching universities by budget:', error);
    res.status(500).json({
      error: 'Failed to fetch universities',
      message: 'Please try again later'
    });
  }
});

export default router; 