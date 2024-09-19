// controllers/mentorController.js
const Mentor = require('../models/Mentor');

// Get mentors based on filters
const getMentors = async (req, res) => {
  try {
    const { search, companies, skills, domains } = req.query;
    let query = {};

    // Text search for name or bio
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },  // Case-insensitive
        { bio: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by selected companies
    if (companies) {
      query.company = { $in: companies.split(',') };
    }

    // Filter by selected skills
    if (skills) {
      query.skills = { $in: skills.split(',') };
    }

    // Filter by selected domains
    if (domains) {
      query.domains = { $in: domains.split(',') };
    }

    const mentors = await Mentor.find(query);
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  getMentors
};
