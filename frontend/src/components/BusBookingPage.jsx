import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../busBookingPage.css';

const BusBookingPage = () => {
  const seats = [
    ['A1', 'A2', 'A3', 'A4'],
    ['B1', 'B2', 'B3', 'B4'],
    ['C1', 'C2', 'C3', 'C4'],
    ['D1', 'D2', 'D3', 'D4'],
  ];
  const reservedSeats = ['B2', 'C3'];
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  
  // Retrieve bus route from location state
  const location = useLocation();
  const busRoute = location.state?.busRoute;

  const toggleSeatSelection = (seat) => {
    if (reservedSeats.includes(seat)) return;
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seat)
        ? prevSelected.filter((s) => s !== seat)
        : [...prevSelected, seat]
    );
  };

  const handleConfirmBooking = async () => {
    const bookingDetails = {
      name: 'John Doe', // Replace with actual user input
      email: 'johndoe@example.com', // Replace with actual user input
      selectedSeats,
      busRoute,  // Pass the bus route here
    };
  
    console.log('Booking Details:', bookingDetails); // Debug
  
    try {
      const response = await axios.post('http://localhost:5000/api/bookings/create', bookingDetails);
      console.log('Response:', response.data); // Debug
      navigate('/billing', { state: { booking: response.data } });
    } catch (error) {
      console.error('Error creating booking:', error); // Debug
    }
  };

  return (
    <div className="main-container">
      <div className="card-container">
        <h2 className="title">Bus Seat Booking</h2>
        <div className="bus-front">
          <div className="front-label">FRONT</div>
        </div>
        <div className="seat-layout">
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {row.map((seat) => (
                <button
                  key={seat}
                  onClick={() => toggleSeatSelection(seat)}
                  disabled={reservedSeats.includes(seat)}
                  className={`seat-button 
                    ${reservedSeats.includes(seat) ? 'reserved' : ''}
                    ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                >
                  {seat}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="legend">
          <div className="legend-item">
            <div className="legend-box available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-box selected"></div>
            <span>Selected</span>
          </div>
          <div className="legend-item">
            <div className="legend-box reserved"></div>
            <span>Reserved</span>
          </div>
        </div>
        <div className="booking-details">
          <h3 className="details-title">Booking Details</h3>
          <div className="details-text">
            <p>Selected Seats:</p>
            <p className="details-seats">
              {selectedSeats.length ? selectedSeats.join(',') : 'None'}
            </p>
          </div>
          <button
            className={`confirm-button ${selectedSeats.length ? 'enabled' : 'disabled'}`}
            disabled={!selectedSeats.length}
            onClick={handleConfirmBooking}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusBookingPage;
