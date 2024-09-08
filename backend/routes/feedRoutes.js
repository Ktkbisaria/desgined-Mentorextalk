const express = require('express');
const { getFeed, addPost } = require('../controllers/feedController');
const router = express.Router();

router.get('/', getFeed);
router.post('/', addPost);

module.exports = router;
