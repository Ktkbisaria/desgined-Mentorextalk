const Resume = require('../models/Resume');
const User = require('../models/User');

exports.uploadResume = async (req, res) => {
  try {
    const newResume = new Resume({
      student: req.user._id,
      file: req.file.path
    });
    await newResume.save();
    res.status(201).json({ message: 'Resume uploaded successfully', resume: newResume });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading resume', error: error.message });
  }
};

exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().populate('student', 'username');
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resumes', error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    const comment = {
      mentor: req.user._id,
      text: req.body.text
    };
    resume.comments.push(comment);
    await resume.save();
    res.status(200).json({ message: 'Comment added successfully', resume });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
};

exports.getResumeDetails = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id)
      .populate('student', 'username')
      .populate('comments.mentor', 'username');
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resume details', error: error.message });
  }
};