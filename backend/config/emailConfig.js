const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',  // Change back to using 'service' instead of host/port
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS.replace(/\s/g, '') // Remove any spaces from the password
  }
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email config error:', error);
  } else {
    console.log('Email server is ready to take our messages');
  }
});

module.exports = transporter; 