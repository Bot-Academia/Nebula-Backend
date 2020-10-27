const mongoose = require('mongoose');

const clubSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  startDate: { type: Date, default: Date.now, required: true },
  coverImage: String,
  admin: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  team: {
    type: Array,
    ref: 'User',
  },
  members: {
    type: Array,
    ref: 'User',
  },
  description: {
    type: String,
    trim: true,
  },
  events: {
    type: Array,
    ref: 'Event',
  },
  ircchannel: String,
  instagram: String,
  facebook: String,
  website: String,
});

module.exports = mongoose.model('Club', clubSchema);
