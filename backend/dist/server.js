"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const contact_1 = __importDefault(require("./routes/contact"));
const students_1 = __importDefault(require("./routes/students"));
const universities_1 = __importDefault(require("./routes/universities"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Initialize database
const initializeDatabase = async () => {
    try {
        await (0, database_1.createTables)();
        await (0, database_1.insertSampleData)();
        console.log('✅ Database initialized successfully');
    }
    catch (error) {
        console.error('❌ Error initializing database:', error);
        console.log('⚠️  Server will continue without database initialization');
    }
};
// Routes
app.use('/api/contact', contact_1.default);
app.use('/api/students', students_1.default);
app.use('/api/universities', universities_1.default);
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
app.use((err, req, res, next) => {
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
exports.default = app;
//# sourceMappingURL=server.js.map