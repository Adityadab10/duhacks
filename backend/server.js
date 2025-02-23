require('dotenv').config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Message = require('./models/Message');
const ChatApp = require('./models/ChatApp');
const companyRoutes = require("./routes/companyRoutes");
const freelancerRoutes = require("./routes/FreelancerRoutes");
const jobRoutes = require('./routes/jobRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// In-memory storage for companies (temporary, replace with DB later)
const companies = new Map();

// Company Routes
app.use('/api/company', companyRoutes);
app.use("/api", freelancerRoutes);
app.use('/api', jobRoutes);


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ["GET", "POST"]
  }
});

const activeUsers = new Map();

// Chat message routes
app.get("/api/messages/:roomId", async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId })
      .sort({ timestamp: -1 })
      .limit(50);
    res.json(messages.reverse());
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Error fetching messages" });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const { roomId, sender, content } = req.body;
    const message = new Message({
      room: roomId,
      sender,
      content,
      timestamp: new Date()
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Error saving message" });
  }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", async ({ roomId, userId, userType }) => {
    try {
      socket.join(roomId);
      
      // Store user information
      activeUsers.set(socket.id, { userId, roomId, userType });
      
      // Notify room about new user
      io.to(roomId).emit("userJoined", {
        userId,
        userType,
        onlineUsers: Array.from(activeUsers.values())
          .filter(user => user.roomId === roomId)
          .map(user => user.userId)
      });

      // Send recent messages
      const messages = await Message.find({ room: roomId })
        .sort({ timestamp: -1 })
        .limit(50);
      socket.emit("recentMessages", messages.reverse());
    } catch (err) {
      console.error("Error in joinRoom:", err);
      socket.emit("error", "Failed to join room");
    }
  });

  socket.on("message", async (messageData) => {
    try {
      const { roomId, sender, content } = messageData;
      const message = new Message({
        room: roomId,
        sender,
        content,
        timestamp: new Date()
      });
      await message.save();
      io.to(roomId).emit("message", message);
    } catch (err) {
      console.error("Error sending message:", err);
      socket.emit("error", "Failed to send message");
    }
  });

  socket.on("disconnect", () => {
    const userData = activeUsers.get(socket.id);
    if (userData) {
      const { roomId } = userData;
      activeUsers.delete(socket.id);
      
      // Notify room about user leaving
      io.to(roomId).emit("userLeft", {
        userId: userData.userId,
        onlineUsers: Array.from(activeUsers.values())
          .filter(user => user.roomId === roomId)
          .map(user => user.userId)
      });
    }
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    activeUsers: activeUsers.size
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
