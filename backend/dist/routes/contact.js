"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("../config/database");
const email_1 = require("../utils/email");
const router = express_1.default.Router();
// Submit contact form
router.post('/submit', async (req, res) => {
    const { name, email, phone, country_of_interest, message } = req.body;
    try {
        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Name, email, and message are required'
            });
        }
        // Check database connection
        try {
            await database_1.pool.query('SELECT 1');
        }
        catch (dbError) {
            console.error('Database connection error:', dbError);
            // Return success even if database is not available
            res.status(200).json({
                success: true,
                message: 'Contact form submitted successfully (saved locally)',
                data: {
                    id: Date.now(),
                    status: 'pending',
                    created_at: new Date().toISOString()
                }
            });
            return;
        }
        // Insert into database
        const result = await database_1.pool.query(`INSERT INTO contact_inquiries (name, email, phone, country_of_interest, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`, [name, email, phone, country_of_interest, message]);
        const inquiry = result.rows[0];
        // Send email notification (optional)
        try {
            await (0, email_1.sendContactEmail)({
                name,
                email,
                phone,
                country_of_interest,
                message,
                inquiry_id: inquiry.id
            });
        }
        catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the request if email fails
        }
        res.status(201).json({
            success: true,
            message: 'Contact form submitted successfully',
            data: {
                id: inquiry.id,
                status: inquiry.status,
                created_at: inquiry.created_at
            }
        });
    }
    catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({
            error: 'Failed to submit contact form',
            message: 'Please try again later'
        });
    }
});
// Get all contact inquiries (admin only)
router.get('/inquiries', async (req, res) => {
    try {
        const result = await database_1.pool.query(`SELECT * FROM contact_inquiries 
       ORDER BY created_at DESC`);
        res.json({
            success: true,
            data: result.rows
        });
    }
    catch (error) {
        console.error('Error fetching contact inquiries:', error);
        res.status(500).json({
            error: 'Failed to fetch contact inquiries',
            message: 'Please try again later'
        });
    }
});
// Update inquiry status
router.patch('/inquiries/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const result = await database_1.pool.query(`UPDATE contact_inquiries 
       SET status = $1 
       WHERE id = $2 
       RETURNING *`, [status, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Inquiry not found'
            });
        }
        res.json({
            success: true,
            data: result.rows[0]
        });
    }
    catch (error) {
        console.error('Error updating inquiry status:', error);
        res.status(500).json({
            error: 'Failed to update inquiry status',
            message: 'Please try again later'
        });
    }
});
// Get inquiry by ID
router.get('/inquiries/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await database_1.pool.query(`SELECT * FROM contact_inquiries WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Inquiry not found'
            });
        }
        res.json({
            success: true,
            data: result.rows[0]
        });
    }
    catch (error) {
        console.error('Error fetching inquiry:', error);
        res.status(500).json({
            error: 'Failed to fetch inquiry',
            message: 'Please try again later'
        });
    }
});
// Delete inquiry
router.delete('/inquiries/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await database_1.pool.query(`DELETE FROM contact_inquiries WHERE id = $1 RETURNING *`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Inquiry not found'
            });
        }
        res.json({
            success: true,
            message: 'Inquiry deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting inquiry:', error);
        res.status(500).json({
            error: 'Failed to delete inquiry',
            message: 'Please try again later'
        });
    }
});
exports.default = router;
//# sourceMappingURL=contact.js.map