const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ===== IN-MEMORY DATABASE (for demo) =====
// Replace with MongoDB/PostgreSQL for production
const messages = [];

// ===== ROUTES =====

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

// Get all messages (admin only - should add authentication)
app.get('/api/messages', (req, res) => {
    res.json({
        success: true,
        count: messages.length,
        messages: messages
    });
});

// Submit contact form
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please provide name, email, and message'
        });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address'
        });
    }
    
    // Create message object
    const newMessage = {
        id: messages.length + 1,
        name,
        email,
        message,
        timestamp: new Date(),
        read: false
    };
    
    // Store message
    messages.push(newMessage);
    
    // Log to console
    console.log('New message received:');
    console.log(`From: ${name} (${email})`);
    console.log(`Message: ${message}`);
    console.log(`Time: ${new Date().toLocaleString()}\n`);
    
    // TODO: Send email notification
    // sendEmailNotification(newMessage);
    
    res.status(201).json({
        success: true,
        message: 'Message received successfully',
        data: newMessage
    });
});

// Get single message
app.get('/api/messages/:id', (req, res) => {
    const message = messages.find(m => m.id === parseInt(req.params.id));
    
    if (!message) {
        return res.status(404).json({
            success: false,
            message: 'Message not found'
        });
    }
    
    res.json({
        success: true,
        data: message
    });
});

// Mark message as read
app.put('/api/messages/:id/read', (req, res) => {
    const message = messages.find(m => m.id === parseInt(req.params.id));
    
    if (!message) {
        return res.status(404).json({
            success: false,
            message: 'Message not found'
        });
    }
    
    message.read = true;
    
    res.json({
        success: true,
        message: 'Message marked as read',
        data: message
    });
});

// Delete message
app.delete('/api/messages/:id', (req, res) => {
    const index = messages.findIndex(m => m.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Message not found'
        });
    }
    
    const deletedMessage = messages.splice(index, 1);
    
    res.json({
        success: true,
        message: 'Message deleted successfully',
        data: deletedMessage
    });
});

// Serve index.html for all unknown routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   Personal Portfolio Backend Server    ║
╚════════════════════════════════════════╝
    
✓ Server running on http://localhost:${PORT}
✓ Frontend: http://localhost:${PORT}
✓ API Base: http://localhost:${PORT}/api

Available endpoints:
  GET    /api/health               - Check server status
  POST   /api/contact              - Submit contact form
  GET    /api/messages             - Get all messages
  GET    /api/messages/:id         - Get specific message
  PUT    /api/messages/:id/read    - Mark message as read
  DELETE /api/messages/:id         - Delete message

Press Ctrl+C to stop the server
    `);
});
