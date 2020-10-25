const mongoose  = require('mongoose');

const userSchema=mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    avatar: String,
    name: String,
    email: String,
    entryno: String,
    description:String,
    clubs:{
        owner:Array,
        member:Array
    },
});

module.exports=mongoose.model('User',userSchema);