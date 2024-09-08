const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
console.log('Signup function:', authController.signup);


router.post('/login', authController.login);
console.log('Login function:', authController.login);

module.exports = router;
