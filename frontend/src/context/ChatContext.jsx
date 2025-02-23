import React, { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

// Create Chat Context
const ChatContext = createContext();

// Initialize socket connection
const socket = io("http://localhost:4000");

// Test data for development
const testChats = [
  {
    roomId: "test_room_1",
    partnerId: "test-freelancer-1",
    partnerName: "John Doe",
    lastMessage: "Hi, I'm interested in your project",
    isOnline: true,
  }
];

const testMessages = {
  test_room_1: [
    {
      id: 1,
      sender: "test-freelancer-1",
      content: "Hi, I'm interested in your project",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 2,
      sender: "company-1",
      content: "Great! Can you tell me about your experience?",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
    },
  ]
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState(testMessages);
  const [currentChatRoom, setCurrentChatRoom] = useState(null);
  const [activeChats, setActiveChats] = useState(testChats);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [message.chatRoomId]: [...(prevMessages[message.chatRoomId] || []), message],
      }));
    });

    socket.on("userJoined", ({ userId, userType, onlineUsers }) => {
      setActiveChats(prev => prev.map(chat => ({
        ...chat,
        isOnline: onlineUsers.includes(chat.partnerId)
      })));
    });

    return () => {
      socket.off("message");
      socket.off("userJoined");
    };
  }, []);

  const startChat = (userId, recipientId) => {
    const chatRoomId = [userId, recipientId].sort().join("_");
    setCurrentChatRoom(chatRoomId);
    
    // Add to active chats if not exists
    if (!activeChats.find(chat => chat.partnerId === recipientId)) {
      setActiveChats(prev => [...prev, {
        roomId: chatRoomId,
        partnerId: recipientId,
        partnerName: `User ${recipientId}`,
        isOnline: false
      }]);
    }
    
    socket.emit("joinRoom", { roomId: chatRoomId, userId });
  };

  const sendMessage = (userId, recipientId, content) => {
    if (!currentChatRoom) return;

    const messageData = {
      sender: userId,
      receiver: recipientId,
      content,
      chatRoomId: currentChatRoom,
      timestamp: new Date().toISOString(),
    };

    socket.emit("message", messageData);
    setMessages((prevMessages) => ({
      ...prevMessages,
      [currentChatRoom]: [...(prevMessages[currentChatRoom] || []), messageData],
    }));

    // Update last message in active chats
    setActiveChats(prev => prev.map(chat => 
      chat.partnerId === recipientId 
        ? { ...chat, lastMessage: content }
        : chat
    ));
  };

  const value = {
    messages,
    currentChatRoom,
    activeChats,
    startChat,
    sendMessage
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
