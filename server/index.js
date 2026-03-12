const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const process = require('node:process');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const learningRoutes = require('./routes/learningRoutes');
const noteRoutes = require('./routes/noteRoutes');

dotenv.config();
connectDB();

const app = express();

app.use((_req, _res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/notes', noteRoutes);

// Base route
app.get('/', (_req, res) => {
    res.send('GateGPT API is running...');
});

// Error handling middleware
app.use((err, _req, res, _next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
