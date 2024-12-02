import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import '../confirmationPage.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails;

  if (!bookingDetails) {
    return (
      <div className="container">
        <div className="card">
          <h1 className="title">No Booking Details Found!</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header-section">
          <div className="icon-wrapper">
            <CheckCircle className="icon" />
          </div>
          <h1 className="title">Booking Confirmed!</h1>
          <p className="subtitle">Thank you for choosing to travel with us</p>
        </div>

        <div className="details-section">
          <div className="grid">
            <div className="detail-row">
              <span className="label">Passenger Name</span>
              <span className="value">{bookingDetails.name}</span>
            </div>

            <div className="detail-row">
              <span className="label">Bus Route</span>
              <span className="value">{bookingDetails.busRoute}</span>
            </div>

            <div className="detail-row">
              <span className="label">Seat Numbers</span>
              <span className="value">{bookingDetails.selectedSeats.join(', ')}</span>
            </div>

            <div className="detail-row">
              <span className="label">Travel Date</span>
              <span className="value">
                {new Date(bookingDetails.bookingDate).toLocaleDateString()}
              </span>
            </div>

            <div className="detail-row">
              <span className="label">Amount Paid</span>
              <span className="amount">₹{bookingDetails.amount}</span>
            </div>
          </div>
        </div>

        <div className="email-alert">
          <p className="email-text">
            An email with your booking details has been sent to your registered email address.
          </p>
        </div>

        <div className="reference">
          <p className="reference-text">
            Booking Reference: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
