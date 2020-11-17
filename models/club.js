const mongoose = require('mongoose');

const clubSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  startDate: { type: Date, default: Date.now, required: true },
  coverImage: String,
  admin: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  team: { type: [{ type: mongoose.Types.ObjectId, ref: 'User' }] },
  members: { type: [{ type: mongoose.Types.ObjectId, ref: 'User' }] },
  description: {
    type: String,
    trim: true,
  },
  events: { type: [{ type: mongoose.Types.ObjectId, ref: 'Event' }] },
  ircchannel: String,
  instagram: String,
  facebook: String,
  website: String,
});

module.exports = mongoose.model('Club', clubSchema);
