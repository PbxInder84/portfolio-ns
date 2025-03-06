const Blog = require('../models/Blog');

const getBlogs = async (req, res) => {
    const blogs = await Blog.find();
    res.json(blogs);
};

const addBlog = async (req, res) => {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
};

const updateBlog = async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(blog);
};

const deleteBlog = async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully." });
};

module.exports = { getBlogs, addBlog, updateBlog, deleteBlog }; 