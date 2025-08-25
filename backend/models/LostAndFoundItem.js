const mongoose = require('mongoose');

const lostAndFoundSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  image: {
    type: String, // File name or URL
    default: ''
  },
  status: {
    type: String,
    enum: ['lost', 'found', 'claimed'],
    default: 'lost'
  },
  reportedBy: {
    type: String, // Later link to user ID
    required: true
  },
  claimedBy: {
    type: String,
    default: ''
  },
  claimedDate: {
    type: Date
  }
}, {
  timestamps: true
});

const LostAndFoundItem = mongoose.model('LostAndFoundItem', lostAndFoundSchema);
module.exports = LostAndFoundItem;
