const mongoose = require("mongoose");

const ChatAppSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, unique: true },
    participants: [
      {
        userId: { type: String, required: true },
        userType: { type: String, enum: ["company", "freelancer"], required: true },
        lastSeen: { type: Date, default: Date.now },
      },
    ],
    lastMessage: {
      content: { type: String },
      sender: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

const ChatApp = mongoose.model("ChatApp", ChatAppSchema);

module.exports = ChatApp;
