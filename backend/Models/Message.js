const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
    index: true // Add index for faster queries
  },
  sender: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  messageType: {
    type: String,
    enum: ['text', 'file', 'image'],
    default: 'text'
  },
  readBy: [{
    userId: String,
    readAt: Date
  }],
  metadata: {
    fileName: String,
    fileSize: Number,
    mimeType: String
  }
});

// Add compound index for efficient querying of messages by room and timestamp
MessageSchema.index({ room: 1, timestamp: -1 });

module.exports = mongoose.model('Message', MessageSchema);
