const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  route: { type: String, required: true },
  feedback: { type: String, required: false },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
