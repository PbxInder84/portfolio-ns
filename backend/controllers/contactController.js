const nodemailer = require('nodemailer');

const submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    // Send email logic
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: `Contact Form Submission from ${name}`,
        text: message
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: "Contact form submitted successfully." });
};

module.exports = { submitContactForm }; 