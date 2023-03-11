const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    minlength: 3,
    maxlength: 8,
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
    minlength: 3,
    maxlength: 8,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength:6
  },
});

module.exports = mongoose.model('User', UserSchema)
