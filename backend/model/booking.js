const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  selectedSeats: [{ type: String, required: true }],
  busRoute: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
  amount: {type: Number, required: false}
});

module.exports = mongoose.model('Booking', bookingSchema);
