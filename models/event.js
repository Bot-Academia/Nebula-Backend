const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
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
    type: String,
    default: 'Draft',
  },
});

module.exports = mongoose.model('Event', eventSchema);
