const transporter = require('../config/emailConfig')

const sendBookingEmail = async(bookingDetails) => {
  const { name, busRoute, selectedSeats, bookingDate, amount, email } = bookingDetails;

  const feedbackLink = `http://localhost:3000/feedback?name=${encodeURIComponent(name)}&route=${encodeURIComponent(busRoute)}`;

  const emailContent = `
  <h1>Booking Details</h1>
  <p>Name: ${name}</p>
  <p>Route: ${busRoute}</p>
  <p>Seats: ${selectedSeats.join(', ')}</p>
  <p>Date: ${new Date(bookingDate).toLocaleDateString()}</p>
  <p>Time: ${new Date(bookingDate).toLocaleTimeString()}</p>
  <p>Amount Paid: ₹${amount}</p>
  <p>Please provide your feedback here:</p>
  <a href="${feedbackLink}">Feedback Form</a>
`;


try {
    await transporter.sendMail({
      from: 'sreerajs00000@gmail.com', // sender address
      to: email || 'sreerajs00000@gmail.com', // recipient email
      subject: 'Booking Details', // Subject line
      html: emailContent, // HTML body content
    });
    console.log('Booking email sent successfully!');
  } catch (error) {
    console.error('Failed to send booking email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = {sendBookingEmail};
