const SocialLink = require('../models/SocialLink');

const getSocialLinks = async (req, res) => {
    const socialLinks = await SocialLink.find();
    res.json(socialLinks);
};

const addSocialLink = async (req, res) => {
    const socialLink = new SocialLink(req.body);
    await socialLink.save();
    res.status(201).json(socialLink);
};

const updateSocialLink = async (req, res) => {
    const socialLink = await SocialLink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(socialLink);
};

const deleteSocialLink = async (req, res) => {
    await SocialLink.findByIdAndDelete(req.params.id);
    res.json({ message: "Social link deleted successfully." });
};

module.exports = { getSocialLinks, addSocialLink, updateSocialLink, deleteSocialLink }; 