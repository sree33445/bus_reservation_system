// // controllers/emailController.js
// const nodemailer = require('nodemailer');
// const emailConfig = require('../config/emailConfig');

// const transporter = nodemailer.createTransport(emailConfig);

// const sendBookingConfirmationEmail = (bookingDetails) => {
//   const mailOptions = {
//     from: emailConfig.auth.user,
//     to: bookingDetails.email,
//     subject: 'Booking Confirmation',
//     text: `
//       Booking Confirmation:
//       Name: ${bookingDetails.name}
//       Route: ${bookingDetails.busRoute}
//       Seats: ${bookingDetails.selectedSeats.join(', ')}
//       Date: ${new Date(bookingDetails.bookingDate).toLocaleDateString()}
//       Amount: ₹${bookingDetails.amount}
//     `,
//   };

//   return transporter.sendMail(mailOptions);
// };

// module.exports = { sendBookingConfirmationEmail };
