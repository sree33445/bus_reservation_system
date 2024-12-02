const Bus = require('../model/bus')

exports.getAllBuses = async (req, res) => {
    try {
      const buses = await Bus.find(); // Ensure this returns an array
      res.status(200).json(buses);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch buses', error });
    }
  };
  

exports.bookBus = async (req, res) => {
    const { busId } = req.params;
    const userId = req.user.id;
  
    try {
      // Implement your booking logic here
      res.json({ message: `Bus with ID: ${busId} booked successfully by user ID: ${userId}!` });
    } catch (error) {
      console.error('Error during bus booking:', error);
      res.status(500).json({ message: 'Failed to book the bus. Please try again later.' });
    }
  };
  