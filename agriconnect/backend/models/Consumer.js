const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ConsumerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  metamaskId: {
    type: String,
    required: true,
    unique: true, // Crucial: One wallet per consumer account
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


// --- AUTOMATIC HASHING LOGIC ---
ConsumerSchema.pre('save', async function () {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

  } catch (err) {
    next(err);
  }
});


module.exports = mongoose.model('Consumer', ConsumerSchema);