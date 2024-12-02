import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, MapPin, Users, Calendar, CreditCard } from 'lucide-react';
import '../billingPage.css';

const BillingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;
  const [paymentLoading, setPaymentLoading] = useState(false);

  if (!booking) {
    return (
      <div className="billing-container">
        <div className="billing-wrapper">
          <div className="no-booking">No booking details found!</div>
        </div>
      </div>
    );
  }

  const handleProceedToPayment = async () => {
    setPaymentLoading(true);

    const bookingDetails = {
      name: booking.name,
      busRoute: booking.busRoute,
      selectedSeats: booking.selectedSeats,
      bookingDate: booking.bookingDate,
      amount: booking.selectedSeats.length * 500, // Calculate amount based on seats
    };

    // Mock the email API call (you can replace this with actual backend integration)
    try {
      const response = await fetch('http://localhost:5000/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDetails),
      });

      if (response.ok) {
        alert('Booking details sent successfully to your email!');
        // Navigate to ConfirmationPage with the booking details
        navigate('/confirmation', { state: { bookingDetails } });
      } else {
        alert('Failed to send booking details. Please try again.');
      }
    } catch (error) {
      console.error('Error sending booking details:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="billing-container">
      <div className="billing-wrapper">
        <header className="billing-header">
          <h1 className="header-title">Booking Details</h1>
          <p className="header-subtitle">Review your journey information</p>
        </header>

        <div className="billing-card">
          <div className="main-content">
            <div className="passenger-section">
              <h2 className="passenger-name">{booking.name}</h2>
              <p className="booking-reference">
                Booking Reference: #{Math.random().toString(36).substr(2, 8).toUpperCase()}
              </p>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <div className="icon-wrapper">
                  <MapPin size={20} className="icon" />
                </div>
                <div className="detail-content">
                  <p className="label">Destination</p>
                  <p className="value">{booking.busRoute}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="icon-wrapper">
                  <Users size={20} className="icon" />
                </div>
                <div className="detail-content">
                  <p className="label">Selected Seats</p>
                  <p className="value">{booking.selectedSeats.join(',')}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="icon-wrapper">
                  <Calendar size={20} className="icon" />
                </div>
                <div className="detail-content">
                  <p className="label">Travel Date</p>
                  <p className="value">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="icon-wrapper">
                  <Clock size={20} className="icon" />
                </div>
                <div className="detail-content">
                  <p className="label">Booking Time</p>
                  <p className="value">{new Date(booking.bookingDate).toLocaleTimeString()}</p>
                </div>
              </div>
            </div>

            <div className="pricing-section">
              <div className="price-row">
                <span className="price-label">Total Amount</span>
                <span className="price-value">₹{booking.selectedSeats.length * 500}</span>
              </div>
            </div>
          </div>

          <div className="button-section">
            <button
              className="payment-button"
              onClick={handleProceedToPayment}
              disabled={paymentLoading}
            >
              <CreditCard size={20} />
              {paymentLoading ? 'Processing...' : ' Pay'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
