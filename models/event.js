const mongoose  = require('mongoose');

const eventSchema=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name: String,
    startDate: Date,
    endDate: Date,
    coverImage: String,
    details: String,
    location: String,
    link: String,
    club: mongoose.Types.ObjectId,
    status: {type: String,default: 'Draft'}
});

module.exports=mongoose.model('Event',eventSchema);