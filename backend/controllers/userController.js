const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const {
    username,
    email,
    bio,
    education,
    experience,
    skills,
    mentorSpecialty,
    profilePicture
  } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (education) {
      user.education = {
        level: education.level,
        fieldOfStudy: education.fieldOfStudy,
        institution: education.institution,
        graduationYear: education.graduationYear
      };
    }
    if (experience) {
      // Ensure experience is always an array
      user.experience = Array.isArray(experience) ? experience : [experience];
      
      // Validate and format each experience entry
      user.experience = user.experience.map(exp => ({
        company: exp.company || '',
        jobTitle: exp.jobTitle || '',
        startDate: exp.startDate || null,
        endDate: exp.endDate || null,
        responsibilities: exp.responsibilities || ''
      }));
    }
    if (skills) user.skills = skills;
    if (user.role === 'mentor' && mentorSpecialty) {
      user.mentorSpecialty = mentorSpecialty;
    }
    if (profilePicture) user.profilePicture = profilePicture;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      bio: updatedUser.bio,
      education: updatedUser.education,
      experience: updatedUser.experience,
      skills: updatedUser.skills,
      role: updatedUser.role,
      mentorSpecialty: updatedUser.mentorSpecialty,
      profilePicture: updatedUser.profilePicture
    });
  } catch (error) {
    console.error('Error in updateProfile:', error);
    res.status(500).json({
      message: 'Error updating user profile',
      error: error.message
    });
  }
};

// Add mentor session (for mentors only)
exports.addMentorSession = async (req, res) => {
  const { title, date } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'mentor') {
      return res.status(403).json({ message: 'Unauthorized. Only mentors can add sessions.' });
    }

    user.mentorSessions.push({ title, date });
    await user.save();

    res.status(201).json({
      message: 'Mentor session added successfully',
      session: { title, date }
    });
  } catch (error) {
    console.error('Error in addMentorSession:', error);
    res.status(500).json({
      message: 'Error adding mentor session',
      error: error.message
    });
  }
};