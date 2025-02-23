const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    room: { type: String, required: true }, // Ensure this stores `roomId` (String)
    sender: { type: String, required: true },
    content: { type: String, required: true },
    messageType: { type: String, enum: ["text", "image", "file"], default: "text" },
    timestamp: { type: Date, default: Date.now },
    readBy: [
      {
        userId: { type: String },
        readAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
