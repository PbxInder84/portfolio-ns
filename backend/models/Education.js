const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: { 
    type: String, 
    required: true 
  },
  degree: { 
    type: String, 
    required: true 
  },
  field: { 
    type: String 
  },
  startDate: { 
    type: Date 
  },
  endDate: { 
    type: Date 
  },
  description: { 
    type: String 
  },
  location: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Education', educationSchema); 