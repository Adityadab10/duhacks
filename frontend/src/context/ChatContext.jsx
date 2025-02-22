import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [activeChats, setActiveChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const startChat = (userId, partnerId) => {
    const roomId = [userId, partnerId].sort().join('-');
    setCurrentChat({
      roomId,
      partnerId
    });
    
    if (socket) {
      socket.emit('joinRoom', { room: roomId, userId });
    }
    
    // Add to active chats if not already present
    if (!activeChats.find(chat => chat.roomId === roomId)) {
      setActiveChats(prev => [...prev, { roomId, partnerId }]);
    }
  };

  const value = {
    socket,
    activeChats,
    currentChat,
    startChat,
    setCurrentChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
