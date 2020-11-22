const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  coverImage: String,
  details: {
    type: String,
    trim: true,
  },
  location: String,
  link: String,
  club: {
    type: mongoose.Types.ObjectId,
    ref: 'Club',
  },
  status: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
},
{ timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
