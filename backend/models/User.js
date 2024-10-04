const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['mentor', 'student'], required: true },

  bio: { type: String },

  // Update education field to be an object with subfields
  education: {
    level: { type: String },  // e.g., Bachelor's, Master's
    fieldOfStudy: { type: String },
    institution: { type: String },
    graduationYear: { type: String }
  },

  // Update experience field to be an array of objects with subfields
  experience: [
    {
      company: { type: String },
      jobTitle: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      responsibilities: { type: String }
    }
  ],

  skills: [{ type: String }], // Array of skills
  mentorSpecialty: { type: String, enum: ['career-guidance', 'tech-skills', 'personal-development'] },

  // Session data for mentors
  mentorSessions: [
    {
      title: { type: String },
      date: { type: Date }
    }
  ],

  profilePicture: { type: String }, // URL to profile picture
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
