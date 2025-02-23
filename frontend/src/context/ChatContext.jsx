import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

// Mock users for testing
const MOCK_USERS = {
  'company-1': {
    id: 'company-1',
    name: 'Tech Innovators Inc.',
    role: 'company'
  },
  'freelancer-1': {
    id: 'freelancer-1',
    name: 'John Doe',
    role: 'freelancer'
  }
};

// Initial messages for testing
const INITIAL_MESSAGES = [
  {
    id: 1,
    senderId: 'company-1',
    receiverId: 'freelancer-1',
    content: "Hi John! We loved your portfolio. Would you be interested in discussing a React project?",
    timestamp: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 2,
    senderId: 'freelancer-1',
    receiverId: 'company-1',
    content: "Thank you! Yes, I'd be very interested in learning more about the project.",
    timestamp: new Date(Date.now() - 82800000).toISOString()
  }
];

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem('chatMessages');
    return stored ? JSON.parse(stored) : INITIAL_MESSAGES;
  });

  const [chats, setChats] = useState(() => {
    const stored = localStorage.getItem('chats');
    return stored ? JSON.parse(stored) : {
      'company-1': ['freelancer-1'],
      'freelancer-1': ['company-1']
    };
  });

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  const sendMessage = (senderId, receiverId, content) => {
    const newMessage = {
      id: Date.now(),
      senderId,
      receiverId,
      content,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);

    // Update chats if this is a new conversation
    if (!chats[senderId]?.includes(receiverId)) {
      setChats(prev => ({
        ...prev,
        [senderId]: [...(prev[senderId] || []), receiverId],
        [receiverId]: [...(prev[receiverId] || []), senderId]
      }));
    }
  };

  const getMessages = (userId, partnerId) => {
    return messages.filter(msg => 
      (msg.senderId === userId && msg.receiverId === partnerId) ||
      (msg.senderId === partnerId && msg.receiverId === userId)
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const getUserChats = (userId) => {
    const chatPartners = chats[userId] || [];
    return chatPartners.map(partnerId => ({
      ...MOCK_USERS[partnerId],
      lastMessage: messages
        .filter(msg => 
          (msg.senderId === userId && msg.receiverId === partnerId) ||
          (msg.senderId === partnerId && msg.receiverId === userId)
        )
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0]
    }));
  };

  const getUser = (userId) => MOCK_USERS[userId];

  return (
    <ChatContext.Provider value={{
      sendMessage,
      getMessages,
      getUserChats,
      getUser,
      MOCK_USERS
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
