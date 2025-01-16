const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());  // Middleware pour parser le JSON dans les requêtes


// Routes
app.use('/api', authRoutes);  // <-- Assure-toi que cette ligne existe

module.exports = app;
