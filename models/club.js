const mongoose  = require('mongoose');

const clubSchema = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name: String,
    startDate: { type: Date, default: Date.now },
    coverImage: String,
    admin: mongoose.Types.ObjectId,
    team: Array,
    members: Array,
    description: String,
    events: Array,
    ircchannel: String,
    instagram: String,
    facebook: String,
    website: String
});

module.exports=mongoose.model('Club',clubSchema);