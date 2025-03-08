const transporter = require('../config/emailConfig');

const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.NODEMAILER_USER}>`,
      to: process.env.NODEMAILER_USER,
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    // Send a more specific error message based on the error type
    if (error.code === 'EAUTH') {
      res.status(500).json({ message: 'Email authentication failed. Please check server configuration.' });
    } else {
      res.status(500).json({ message: 'Error sending message. Please try again later.' });
    }
  }
};

module.exports = { sendContactEmail }; 