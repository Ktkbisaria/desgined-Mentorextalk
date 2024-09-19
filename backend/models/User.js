const mongoose = require('mongoose');
   const bcrypt = require('bcryptjs');

   const userSchema = new mongoose.Schema({
     username: { type: String, required: true, unique: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
     role: { type: String, enum: ['mentor', 'student'], required: true },
     // ... other fields ...

     bio: { type: String },
  education: { type: String }, // e.g., Bachelor's, Master's
  experience: { type: String }, // e.g., 5+ years in tech
  skills: [{ type: String }], // Array of skills
  mentorSpecialty: { type: String, enum: ['career-guidance', 'tech-skills', 'personal-development'] },
  
  // Session data for mentors
  mentorSessions: [
    {
      title: { type: String },
      date: { type: Date }
    }
  ],

  // Other potential fields
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