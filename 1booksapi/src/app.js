// app.js
// Main Express app setup

import express from 'express';
import morgan from 'morgan';
import './config/dotenv.js';
import bookRoutes from './routes/bookRoutes.js';
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json()); // to parse JSON body

// Routes
app.use('/api/books', bookRoutes);
app.get('/', (req, res) => {
    res.send('📚 Welcome to the Books API');
});

export default app;
