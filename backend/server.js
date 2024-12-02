
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
require('dotenv').config();

const connectDB = require('./model/database');
const authRoutes = require('./routes/authRoutes')
const busRoutes = require('./routes/busRoutes')
const bookingRoutes = require('./routes/bookingRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes')
// const emailRoutes = require('./routes/emailRoutes');


// Environment Variables
const SECRET_KEY = process.env.SECRET_KEY || 'your_secure_secret_key'; // Ensure to set this in .env
const PORT = process.env.PORT || 5000;

// Initialize Express App
const app = express();
app.use(helmet()); // Enhance security
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

//APIs
app.use('/auth',authRoutes)
app.use('/api/bookings',bookingRoutes)
app.use('/api', busRoutes);
app.use('/api/feedback', feedbackRoutes)


// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});