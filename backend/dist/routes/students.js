"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("../config/database");
const router = express_1.default.Router();
// Submit student application
router.post('/apply', async (req, res) => {
    const { first_name, last_name, email, phone, country_of_origin, desired_country, desired_program, education_level, english_level, budget_range, message } = req.body;
    try {
        // Validate required fields
        if (!first_name || !last_name || !email) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'First name, last name, and email are required'
            });
        }
        // Check if email already exists
        const existingStudent = await database_1.pool.query('SELECT id FROM students WHERE email = $1', [email]);
        if (existingStudent.rows.length > 0) {
            return res.status(400).json({
                error: 'Email already registered',
                message: 'A student with this email already exists'
            });
        }
        // Insert new student application
        const result = await database_1.pool.query(`INSERT INTO students (
        first_name, last_name, email, phone, country_of_origin,
        desired_country, desired_program, education_level,
        english_level, budget_range, message
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`, [
            first_name, last_name, email, phone, country_of_origin,
            desired_country, desired_program, education_level,
            english_level, budget_range, message
        ]);
        const student = result.rows[0];
        res.status(201).json({
            success: true,
            message: 'Student application submitted successfully',
            data: {
                id: student.id,
                status: student.status,
                created_at: student.created_at
            }
        });
    }
    catch (error) {
        console.error('Error submitting student application:', error);
        res.status(500).json({
            error: 'Failed to submit application',
            message: 'Please try again later'
        });
    }
});
// Get all students (admin only)
router.get('/', async (req, res) => {
    try {
        const result = await database_1.pool.query(`SELECT * FROM students 
       ORDER BY created_at DESC`);
        res.json({
            success: true,
            data: result.rows
        });
    }
    catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({
            error: 'Failed to fetch students',
            message: 'Please try again later'
        });
    }
});
// Get student by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await database_1.pool.query('SELECT * FROM students WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Student not found'
            });
        }
        res.json({
            success: true,
            data: result.rows[0]
        });
    }
    catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({
            error: 'Failed to fetch student',
            message: 'Please try again later'
        });
    }
});
// Update student status
router.patch('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const result = await database_1.pool.query(`UPDATE students 
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2 
       RETURNING *`, [status, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Student not found'
            });
        }
        res.json({
            success: true,
            data: result.rows[0]
        });
    }
    catch (error) {
        console.error('Error updating student status:', error);
        res.status(500).json({
            error: 'Failed to update student status',
            message: 'Please try again later'
        });
    }
});
// Update student information
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, phone, country_of_origin, desired_country, desired_program, education_level, english_level, budget_range, message } = req.body;
    try {
        const result = await database_1.pool.query(`UPDATE students 
       SET first_name = $1, last_name = $2, phone = $3,
           country_of_origin = $4, desired_country = $5,
           desired_program = $6, education_level = $7,
           english_level = $8, budget_range = $9, message = $10,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $11 
       RETURNING *`, [
            first_name, last_name, phone, country_of_origin,
            desired_country, desired_program, education_level,
            english_level, budget_range, message, id
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Student not found'
            });
        }
        res.json({
            success: true,
            data: result.rows[0]
        });
    }
    catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({
            error: 'Failed to update student',
            message: 'Please try again later'
        });
    }
});
// Delete student
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await database_1.pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Student not found'
            });
        }
        res.json({
            success: true,
            message: 'Student deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({
            error: 'Failed to delete student',
            message: 'Please try again later'
        });
    }
});
// Get students by status
router.get('/status/:status', async (req, res) => {
    const { status } = req.params;
    try {
        const result = await database_1.pool.query('SELECT * FROM students WHERE status = $1 ORDER BY created_at DESC', [status]);
        res.json({
            success: true,
            data: result.rows
        });
    }
    catch (error) {
        console.error('Error fetching students by status:', error);
        res.status(500).json({
            error: 'Failed to fetch students',
            message: 'Please try again later'
        });
    }
});
// Get students by country
router.get('/country/:country', async (req, res) => {
    const { country } = req.params;
    try {
        const result = await database_1.pool.query('SELECT * FROM students WHERE desired_country = $1 ORDER BY created_at DESC', [country]);
        res.json({
            success: true,
            data: result.rows
        });
    }
    catch (error) {
        console.error('Error fetching students by country:', error);
        res.status(500).json({
            error: 'Failed to fetch students',
            message: 'Please try again later'
        });
    }
});
exports.default = router;
//# sourceMappingURL=students.js.map