const mongoose = require('mongoose');

const salesTeamCommentSchema = new mongoose.Schema({
  salesTeamEntry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SalesTeam',
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  talkedwith:{
    type:String,
    required: true
  },
  relationwithlead:{
    type:String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAuth',
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  callDurationMinutes: {
    type: Number,
  },
  callDurationSeconds: {
    type: Number,
  },
  //these below 2 fields are newly added in this model which needs to be migrated
  callstatus: {
    type: String,
    enum: ['no response', 'hang up', 'voice mail', 'connected']
  },
  leadStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LeadStatusMaster'
  },
});


module.exports = mongoose.model('SalesTeamComment', salesTeamCommentSchema);