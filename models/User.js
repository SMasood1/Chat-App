const { Schema, model } = require('mongoose');

const userSchema = Schema({
  // Could use shorthand but trying to be explicit 
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  profilePhoto: String
})

module.exports = model('User', userSchema);