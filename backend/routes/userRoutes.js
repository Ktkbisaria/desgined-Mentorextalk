const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const router = express.Router();

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

module.exports = router;
