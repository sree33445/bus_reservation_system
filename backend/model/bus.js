const mongoose = require('mongoose');

const busSchema = new mongoose.Schema(
  {
    busID: { type: String, required: true },
    busName: { type: String, required: true },
    route: { type: String, required: true },
    startTime: { type: String, required: true },
    destinationTime: { type: String, required: true },
    stops: { type: [String], required: true }, // Array of stops
    seatsAvailable: { type: Number, required: true },
    fare: { type: Number, required: true },
    imgSrc: { type: String }, // Optional field for image source
  },
  { collection: 'buslist' } // Explicitly map to the 'buslist' collection
);

module.exports = mongoose.model('Bus', busSchema);
