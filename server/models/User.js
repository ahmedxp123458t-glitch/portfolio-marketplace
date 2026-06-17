const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['freelancer', 'client'], required: true },
  bio: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
