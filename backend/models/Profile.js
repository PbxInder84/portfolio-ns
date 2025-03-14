const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  title: { 
    type: String 
  },
  email: { 
    type: String 
  },
  phone: { 
    type: String 
  },
  location: { 
    type: String 
  },
  bio: { 
    type: String 
  },
  avatar: { 
    type: String 
  },
  skills: {
    type: [String],
    default: []
  },
  interests: {
    type: [String],
    default: []
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Only allow one profile document
profileSchema.statics.findOneOrCreate = async function() {
  const profile = await this.findOne();
  if (profile) {
    return profile;
  }
  
  return this.create({
    name: 'Narinder Singh',
    title: 'Full Stack Developer',
    email: 'example@example.com',
    bio: 'Full Stack Developer with expertise in modern web technologies.'
  });
};

module.exports = mongoose.model('Profile', profileSchema); 