const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  participants: [{
    userId: {
      type: String,
      required: true
    },
    userType: {
      type: String,
      enum: ['company', 'freelancer'],
      required: true
    },
    lastSeen: {
      type: Date,
      default: Date.now
    }
  }],
  lastMessage: {
    content: String,
    sender: String,
    timestamp: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
ChatRoomSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
