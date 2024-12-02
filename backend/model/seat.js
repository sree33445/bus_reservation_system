const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true, unique: true },
  isReserved: { type: Boolean, default: false },
});

module.exports = mongoose.model('Seat', seatSchema);
