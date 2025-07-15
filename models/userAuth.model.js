const mongoose = require('mongoose');

const userAuthSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'user-assign', 'marketing', 'management'],
    default: 'user',
    required: true
  },
  isSalesAssociate: {
    type: Boolean,
    default: false
  },
  lastlyAssigned: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('UserAuth', userAuthSchema);
