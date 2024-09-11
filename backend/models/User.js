const mongoose = require('mongoose');
   const bcrypt = require('bcryptjs');

   const userSchema = new mongoose.Schema({
     username: { type: String, required: true, unique: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
     role: { type: String, enum: ['mentor', 'student'], required: true },
     // ... other fields ...
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