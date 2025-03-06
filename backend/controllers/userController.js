const User = require('../models/User');

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
};

const updateUserProfile = async (req, res) => {
    const { name, email, bio, profileImage } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { name, email, bio, profileImage }, { new: true });
    res.json(user);
};

module.exports = { getUserProfile, updateUserProfile }; 