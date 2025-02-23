require('dotenv').config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Message = require('./models/Message');
const ChatRoom = require('./models/ChatRoom');
const companyRoutes = require('./routes/companyRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// In-memory storage for companies (temporary)
const companies = new Map();

// Company Registration Route
app.post('/api/company/register', async (req, res) => {
  try {
    const { companyName, email, password, industry, website } = req.body;

    // Check if company exists
    if (companies.has(email)) {
      return res.status(400).json({ message: 'Company already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create company object
    const company = {
      id: Date.now().toString(),
      companyName,
      email,
      password: hashedPassword,
      industry,
      website,
      createdAt: new Date().toISOString()
    };

    // Store company
    companies.set(email, company);

    // Create JWT token
    const token = jwt.sign(
      { companyId: company.id },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    );

    // Return response without password
    const { password: _, ...companyWithoutPassword } = company;
    res.json({
      token,
      company: companyWithoutPassword
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Company Login Route
app.post('/api/company/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if company exists
    const company = companies.get(email);
    if (!company) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { companyId: company.id },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    );

    // Return response without password
    const { password: _, ...companyWithoutPassword } = company;
    res.json({
      token,
      company: companyWithoutPassword
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Chat Routes
app.get('/api/chat/rooms/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const rooms = await ChatRoom.find({
      'participants.userId': userId
    }).sort({ updatedAt: -1 });
    res.json(rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/chat/messages/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ room: roomId })
      .sort({ timestamp: -1 })
      .limit(50);
    res.json(messages.reverse());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.use('/api/company', companyRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

// Store active chat rooms and their participants
const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle joining a chat room
  socket.on("joinRoom", async ({ room, userId, userType }) => {
    try {
      socket.join(room);
      
      // Store user information
      activeUsers.set(socket.id, { userId, room });
      
      // Update or create chat room
      let chatRoom = await ChatRoom.findOne({ roomId: room });
      if (!chatRoom) {
        chatRoom = new ChatRoom({
          roomId: room,
          participants: [{
            userId,
            userType,
            lastSeen: new Date()
          }]
        });
      } else {
        // Update participant's last seen
        const participant = chatRoom.participants.find(p => p.userId === userId);
        if (participant) {
          participant.lastSeen = new Date();
        } else {
          chatRoom.participants.push({
            userId,
            userType,
            lastSeen: new Date()
          });
        }
      }
      await chatRoom.save();

      // Get recent messages
      const recentMessages = await Message.find({ room })
        .sort({ timestamp: -1 })
        .limit(50);
      
      // Send recent messages to the user
      socket.emit("recentMessages", recentMessages.reverse());
      
      // Notify others in the room
      io.to(room).emit("userJoined", userId);
      
      console.log(`User ${userId} joined room: ${room}`);
    } catch (err) {
      console.error('Error in joinRoom:', err);
    }
  });

  // Handle messages
  socket.on("message", async ({ room, message }) => {
    try {
      // Create new message
      const newMessage = new Message({
        room,
        sender: message.userId,
        content: message.content,
        timestamp: new Date(),
        messageType: 'text',
        readBy: [{ userId: message.userId, readAt: new Date() }]
      });
      await newMessage.save();

      // Update chat room's last message
      await ChatRoom.findOneAndUpdate(
        { roomId: room },
        {
          lastMessage: {
            content: message.content,
            sender: message.userId,
            timestamp: new Date()
          },
          updatedAt: new Date()
        }
      );

      // Broadcast message to room
      io.to(room).emit("message", newMessage);
    } catch (err) {
      console.error('Error in message handling:', err);
    }
  });

  // Handle typing status
  socket.on("typing", ({ room, userId, isTyping }) => {
    socket.to(room).emit("userTyping", { userId, isTyping });
  });

  // Handle leaving a room
  socket.on("leaveRoom", async ({ room, userId }) => {
    try {
      await handleUserLeaving(socket, room, userId);
    } catch (err) {
      console.error('Error in leaveRoom:', err);
    }
  });

  // Handle disconnection
  socket.on("disconnect", async () => {
    try {
      const userInfo = activeUsers.get(socket.id);
      if (userInfo) {
        const { room, userId } = userInfo;
        await handleUserLeaving(socket, room, userId);
        activeUsers.delete(socket.id);
      }
      console.log("User disconnected:", socket.id);
    } catch (err) {
      console.error('Error in disconnect:', err);
    }
  });
});

// Helper function to handle user leaving
async function handleUserLeaving(socket, room, userId) {
  try {
    // Update user's last seen in chat room
    await ChatRoom.findOneAndUpdate(
      { roomId: room, 'participants.userId': userId },
      { 'participants.$.lastSeen': new Date() }
    );

    socket.to(room).emit("userLeft", userId);
    socket.leave(room);
    console.log(`User ${userId} left room: ${room}`);
  } catch (err) {
    console.error('Error in handleUserLeaving:', err);
  }
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    activeUsers: activeUsers.size,
    registeredCompanies: companies.size
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
