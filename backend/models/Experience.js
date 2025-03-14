const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: { 
    type: String, 
    required: true 
  },
  position: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String 
  },
  startDate: { 
    type: Date 
  },
  endDate: { 
    type: Date 
  },
  current: { 
    type: Boolean, 
    default: false 
  },
  description: { 
    type: String 
  },
  achievements: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Experience', experienceSchema); 