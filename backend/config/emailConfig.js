const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sreerajs00000@gmail.com',
      pass: 'mcix fvwj jhgo ipkm',
    },
  });

  module.exports = transporter;