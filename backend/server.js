const dotenv = require('dotenv');
dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI); // Add this to see if it's loading the URI

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Middleware, Routes, etc.

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
