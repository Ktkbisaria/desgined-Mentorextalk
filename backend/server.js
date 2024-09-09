const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // Added correctly
const errorHandler = require('./middlewares/errorHandler'); // Ensure this exists

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes); // For authentication routes (signup, login)
app.use('/api/users', userRoutes); // For user-related routes (profile)

// Error handling middleware
app.use(errorHandler); // Custom error handler to catch and format errors

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
