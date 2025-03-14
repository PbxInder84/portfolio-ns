const Blog = require('../models/Blog');
const User = require('../models/User');

// Get all blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get single blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }
        
        // If blog is not published and user is not admin, return 404
        if (!blog.published && (!req.user || req.user.role !== 'admin')) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }
        
        res.json({
            success: true,
            data: blog
        });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Create new blog
exports.createBlog = async (req, res) => {
    try {
        const { 
            title, 
            content, 
            excerpt,
            tags,
            category,
            published
        } = req.body;
        
        const blog = new Blog({
            title,
            content,
            excerpt,
            tags: tags || [],
            category,
            published: published !== undefined ? published : false,
            author: req.user._id
        });
        
    await blog.save();
        
        res.status(201).json({
            success: true,
            data: blog
        });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update blog
exports.updateBlog = async (req, res) => {
    try {
        const { 
            title, 
            content, 
            excerpt,
            tags,
            category,
            published
        } = req.body;
        
        // Build blog object
        const blogFields = {};
        if (title) blogFields.title = title;
        if (content) blogFields.content = content;
        if (excerpt) blogFields.excerpt = excerpt;
        if (tags) blogFields.tags = tags;
        if (category) blogFields.category = category;
        if (published !== undefined) blogFields.published = published;
        
        let blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }
        
        // Update blog
        blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $set: blogFields },
            { new: true }
        );
        
        res.json({
            success: true,
            data: blog
        });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }
        
        await blog.remove();
        
        res.json({
            success: true,
            message: 'Blog removed'
        });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Save blog (for users)
exports.saveBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }
        
        // Check if blog is already saved by user
        const user = await User.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Add blog to user's saved blogs if not already saved
        if (!user.savedBlogs) {
            user.savedBlogs = [];
        }
        
        if (user.savedBlogs.includes(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Blog already saved'
            });
        }
        
        user.savedBlogs.push(req.params.id);
        await user.save();
        
        res.json({
            success: true,
            message: 'Blog saved successfully'
        });
    } catch (error) {
        console.error('Error saving blog:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Unsave blog (for users)
exports.unsaveBlog = async (req, res) => {
    try {
        // Check if blog exists
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }
        
        // Remove blog from user's saved blogs
        const user = await User.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        if (!user.savedBlogs) {
            return res.status(400).json({
                success: false,
                message: 'No saved blogs'
            });
        }
        
        // Remove blog from saved blogs
        const index = user.savedBlogs.indexOf(req.params.id);
        if (index === -1) {
            return res.status(400).json({
                success: false,
                message: 'Blog not saved'
            });
        }
        
        user.savedBlogs.splice(index, 1);
        await user.save();
        
        res.json({
            success: true,
            message: 'Blog unsaved successfully'
        });
    } catch (error) {
        console.error('Error unsaving blog:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get saved blogs (for users)
exports.getSavedBlogs = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        if (!user.savedBlogs || user.savedBlogs.length === 0) {
            return res.json({
                success: true,
                count: 0,
                data: []
            });
        }
        
        // Get all saved blogs
        const blogs = await Blog.find({
            _id: { $in: user.savedBlogs },
            published: true
        }).sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        console.error('Error fetching saved blogs:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Upload blog image
exports.uploadBlogImage = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }
        
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an image'
            });
        }
        
        // In a real app, you would process the uploaded file
        // For now, we'll just update the blog with a placeholder image URL
        
        blog.image = `/uploads/blogs/${req.file.filename}`;
        await blog.save();
        
        res.json({
            success: true,
            data: {
                image: blog.image
            }
        });
    } catch (error) {
        console.error('Error uploading blog image:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}; 