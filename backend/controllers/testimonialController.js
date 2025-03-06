const Testimonial = require('../models/Testimonial');

const getTestimonials = async (req, res) => {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
};

const addTestimonial = async (req, res) => {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
};

const updateTestimonial = async (req, res) => {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(testimonial);
};

const deleteTestimonial = async (req, res) => {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Testimonial deleted successfully." });
};

module.exports = { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial }; 