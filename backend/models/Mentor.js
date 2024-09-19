// models/Mentor.js
const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  company: { type: String, required: true },
  skills: [{ type: String, required: true }], // Array of skills
  domains: [{ type: String, required: true }], // Array of domains
  createdAt: { type: Date, default: Date.now },
});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
