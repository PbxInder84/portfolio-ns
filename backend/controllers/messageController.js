const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// Get all messages (admin only)
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        
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
        const message = await Message.findById(req.params.id);
        
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
        const message = await Message.findByIdAndUpdate(
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
        const message = await Message.findById(req.params.id);
        
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
        
        const message = await Message.findById(req.params.id);
        
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