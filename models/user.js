const mongoose  = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema=mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    avatar: String,
    name: {
        type: String,
        required: true,
        trim: true},
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      password: {
        type: String,
        required: true
      },
    entryno: :{
        type: String,
        required: true,
        unique: true,
    }
    description:{
        type: String,
        trim: true
    },
    clubs:{
        owner:Array,
        member:Array,
        ref: 'Club'
    },
},{ timestamps: true });

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
      return next()
    }
  
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) {
        return next(err)
      }
  
      this.password = hash
      next()
    })
  })
  
  userSchema.methods.checkPassword = function(password) {
    const passwordHash = this.password
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, passwordHash, (err, same) => {
        if (err) {
          return reject(err)
        }
  
        resolve(same)
      })
    })
  }

module.exports=mongoose.model('User',userSchema);