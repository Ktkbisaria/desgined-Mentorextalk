const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.post('/upload', authMiddleware, upload.single('resume'), resumeController.uploadResume);
router.get('/', authMiddleware, resumeController.getResumes);
router.post('/:id/comment', authMiddleware, resumeController.addComment);
router.get('/:id', authMiddleware, resumeController.getResumeDetails);

module.exports = router;