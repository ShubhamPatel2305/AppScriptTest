const mongoose = require('mongoose');

const salesTeamSchema = new mongoose.Schema({
  contactNumber: {
    type: String,
    required: true,
    unique: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit contact number']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  fullName: {
    type: String,
    required: true
  },
  platform: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlatformMaster'
  },
  studentContacted: {
    type: Boolean,
    default: false
  },
  callstatus: {
    type: String,
    enum: ['no response', 'hang up', 'voice mail', 'connected']
  },
  salesAssociate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAuth'
  },
  coursesPitched: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseMaster'
  }],
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpRequestDate: {
    type: Date
  },
  leadStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LeadStatusMaster'
  },
  studentEnrolled: {
    type: Boolean,
    default: false
  },
  courseBooked: {
    type: Boolean,
    default: false
  },
  bookingAmount: {
    type: Number,
    required: function() {
      return this.courseBooked;
    }
  },
  bookingDate: {
    type: Date,
    required: function() {
      return this.courseBooked;
    }
  },
  bookedCourse: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseMaster'
  }],
  isdnc: {
    type: Boolean,
    default: false
  },
  issupervisory: {
    type: Boolean,
    default: false
  },
  city:{
    type: String,
    trim: true
  },
  degree:{
    type: String,
  },
  jobtitle:{
    type: String,
  },
  callDurationMinutes: {
    type: Number,
    default: 0
  },
  callDurationSeconds: {
    type: Number,
    default: 0
  }
  ,
  message: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SalesTeam', salesTeamSchema);