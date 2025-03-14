const User = require('../models/User');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');
const Testimonial = require('../models/Testimonial');

// Get admin dashboard stats
exports.getStats = async (req, res) => {
    try {
        // Count various entities
        const userCount = await User.countDocuments();
        const projectCount = await Project.countDocuments();
        const blogCount = await Blog.countDocuments();
        const contactCount = await Contact.countDocuments();
        const testimonialCount = await Testimonial.countDocuments();
        
        // Get unread messages count
        const unreadCount = await Contact.countDocuments({ read: false });
        
        // Get pending testimonials count
        const pendingTestimonialCount = await Testimonial.countDocuments({ approved: false });
        
        res.json({
            success: true,
            data: {
                users: userCount,
                projects: projectCount,
                blogs: blogCount,
                contacts: contactCount,
                testimonials: testimonialCount,
                unreadMessages: unreadCount,
                pendingTestimonials: pendingTestimonialCount
            }
        });
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get visitor stats
exports.getVisitorStats = async (req, res) => {
    try {
        // In a real app, you would fetch visitor stats from a database or analytics service
        // For now, we'll return mock data
        
        const period = req.query.period || 'week';
        let data = [];
        
        if (period === 'day') {
            // Hourly data for the last 24 hours
            for (let i = 0; i < 24; i++) {
                data.push({
                    label: `${i}:00`,
                    value: Math.floor(Math.random() * 50)
                });
            }
        } else if (period === 'week') {
            // Daily data for the last 7 days
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            for (let i = 0; i < 7; i++) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                data.push({
                    label: days[date.getDay()],
                    value: Math.floor(Math.random() * 200)
                });
            }
            data.reverse();
        } else if (period === 'month') {
            // Weekly data for the last 4 weeks
            for (let i = 0; i < 4; i++) {
                data.push({
                    label: `Week ${i + 1}`,
                    value: Math.floor(Math.random() * 1000)
                });
            }
            data.reverse();
        } else if (period === 'year') {
            // Monthly data for the last 12 months
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            for (let i = 0; i < 12; i++) {
                const date = new Date();
                date.setMonth(date.getMonth() - i);
                data.push({
                    label: months[date.getMonth()],
                    value: Math.floor(Math.random() * 5000)
                });
            }
            data.reverse();
        }
        
        res.json({
            success: true,
            data
        });
    } catch (error) {
        console.error('Error fetching visitor stats:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get page view stats
exports.getPageViewStats = async (req, res) => {
    try {
        // In a real app, you would fetch page view stats from a database or analytics service
        // For now, we'll return mock data
        
        const data = [
            { label: 'Home', value: Math.floor(Math.random() * 1000) },
            { label: 'Projects', value: Math.floor(Math.random() * 800) },
            { label: 'Blog', value: Math.floor(Math.random() * 600) },
            { label: 'Resume', value: Math.floor(Math.random() * 400) },
            { label: 'Contact', value: Math.floor(Math.random() * 200) }
        ];
        
        res.json({
            success: true,
            data
        });
    } catch (error) {
        console.error('Error fetching page view stats:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get all users (admin only)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Prevent deleting yourself
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot delete your own account'
            });
        }
        
        await user.remove();
        
        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}; 