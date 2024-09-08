const express = require('express');
const { getMentors, addMentor } = require('../controllers/mentorController');
const router = express.Router();

router.get('/', getMentors);
router.post('/', addMentor);

module.exports = router;
