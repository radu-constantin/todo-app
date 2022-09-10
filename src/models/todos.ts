const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  details: {
    type: String
  }
});

module.exports = mongoose.model('Todo', todoSchema);