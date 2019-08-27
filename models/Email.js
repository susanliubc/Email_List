const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const EmailSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Email = mongoose.model('email', EmailSchema);
