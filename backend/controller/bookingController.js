const Booking = require("../model/booking");
const Seat = require("../model/seat"); // Import Seat model
const {sendBookingEmail} = require('../services/emailService')

// Function to update seat reservation
const updateSeatReservation = async (seatNumbers) => {
  try {
    // Update the seats that have been booked
    await Seat.updateMany(
      { seatNumber: { $in: seatNumbers } },
      { isReserved: true }
    );
    console.log("Seats updated successfully");
  } catch (error) {
    console.error("Error updating seats:", error);
  }
};

// Create a booking
const createBooking = async (req, res) => {
  const { name, email, selectedSeats, busRoute } = req.body;

  try {
    // Save the booking
    const newBooking = new Booking({ name, email, selectedSeats, busRoute });
    const savedBooking = await newBooking.save();

    // Update the seats to reserved
    await updateSeatReservation(selectedSeats);

      // Send booking details email
      const bookingDetails = {
        name,
        email,
        busRoute,
        selectedSeats,
        bookingDate: savedBooking.bookingDate,
        amount: selectedSeats.length * 500, // Calculate the amount based on seats
      };
      
      await sendBookingEmail(bookingDetails); // Send email

    // Send back the booking details
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createBooking };
