const { Schema, model } = require('mongoose');

const userSchema = Schema({
  // Could use shorthand but trying to be explicit 
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: Number
  }
})

module.exports = model('User', userSchema);