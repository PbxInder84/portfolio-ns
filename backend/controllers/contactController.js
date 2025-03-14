const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Submit contact form
exports.submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email and message'
            });
        }
        
        // Create new contact message
        const contact = new Contact({
            name,
            email,
            subject,
            message
        });
        
        await contact.save();
        
        // Send email notification (in a real app)
        // This is just a placeholder - you would configure nodemailer properly
        /*
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
            text: `
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `
        };
        
        transporter.sendMail(mailOptions);
        */
        
        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully'
        });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get all messages (admin only)
exports.getMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get single message (admin only)
exports.getMessage = async (req, res) => {
    try {
        const message = await Contact.findById(req.params.id);
        
        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }
        
        res.json({
            success: true,
            data: message
        });
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Mark message as read (admin only)
exports.markMessageAsRead = async (req, res) => {
    try {
        const message = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: { read: true } },
            { new: true }
        );
        
        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }
        
        res.json({
            success: true,
            data: message
        });
    } catch (error) {
        console.error('Error marking message as read:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete message (admin only)
exports.deleteMessage = async (req, res) => {
    try {
        const message = await Contact.findById(req.params.id);
        
        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }
        
        await message.remove();
        
        res.json({
            success: true,
            message: 'Message deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Reply to message (admin only)
exports.replyToMessage = async (req, res) => {
    try {
        const { replyText } = req.body;
        
        if (!replyText) {
            return res.status(400).json({
                success: false,
                message: 'Reply text is required'
            });
        }
        
        const message = await Contact.findById(req.params.id);
        
        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }
        
        // Send reply email (in a real app)
        // This is just a placeholder - you would configure nodemailer properly
        /*
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: message.email,
            subject: `Re: ${message.subject || 'Your Message'}`,
            text: replyText
        };
        
        await transporter.sendMail(mailOptions);
        */
        
        // Update message with reply info
        message.replied = true;
        message.replyText = replyText;
        message.replyDate = Date.now();
        
        await message.save();
        
        res.json({
            success: true,
            message: 'Reply sent successfully',
            data: message
        });
    } catch (error) {
        console.error('Error replying to message:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}; 