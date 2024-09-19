// routes/mentorRoutes.js
const express = require('express');
const { getMentors } = require('../controllers/mentorController');

const router = express.Router();

// Route to fetch mentors based on search and filters
router.get('/', getMentors);

module.exports = router;
