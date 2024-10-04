const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const feedRoutes = require('./routes/feedRoutes'); // Added correctly
const errorHandler = require('./middlewares/errorHandler'); // Ensure this exists
const path = require('path');
const http = require('http'); // Import the HTTP module
const mentorRoutes =require('./routes/mentorRoutes')
const socketIo = require('socket.io'); // Import socket.io

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create an HTTP server
const server = http.createServer(app);

// Initialize socket.io with the server
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Adjust this to match your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes); // For authentication routes (signup, login)
app.use('/api/users', userRoutes); // For user-related routes (profile)
app.use('/api/feed', feedRoutes(io)); // Pass io instance to feed routes
app.use('/api/mentors', mentorRoutes);
app.use('/api/v1/mentors', mentorRoutes);

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Error handling middleware
app.use(errorHandler); // Custom error handler to catch and format errors

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
