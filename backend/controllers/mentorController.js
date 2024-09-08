const Mentor = require('../models/Mentor');

// Get all mentors
exports.getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mentors' });
  }
};

// Add a new mentor
exports.addMentor = async (req, res) => {
  const { name, expertise, bio } = req.body;

  try {
    const newMentor = new Mentor({ name, expertise, bio });
    await newMentor.save();
    res.status(201).json(newMentor);
  } catch (error) {
    res.status(500).json({ message: 'Error adding mentor' });
  }
};
