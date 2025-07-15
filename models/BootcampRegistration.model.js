const mongoose = require('mongoose');

const BootcampRegistrationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email'],
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, 'Phone must be 10 digits'],
    },
    state: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BootcampRegistration', BootcampRegistrationSchema);
