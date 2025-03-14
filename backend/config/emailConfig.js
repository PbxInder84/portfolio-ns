const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.NODEMAILER_USER || !process.env.NODEMAILER_PASS) {
  console.error('Error: NODEMAILER_USER or NODEMAILER_PASS is not set in the environment variables.');
  process.exit(1); // Exit the process with an error code
}

const transporter = nodemailer.createTransport({
  service: 'gmail',  // Change back to using 'service' instead of host/port
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
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