import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [activeChats, setActiveChats] = useState([]);
  const [currentChatRoom, setCurrentChatRoom] = useState(null);
  const [messages, setMessages] = useState({});
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('message', (message) => {
      setMessages(prev => ({
        ...prev,
        [message.room]: [...(prev[message.room] || []), message]
      }));
    });

    socket.on('recentMessages', (messages) => {
      if (messages.length > 0) {
        const roomId = messages[0].room;
        setMessages(prev => ({
          ...prev,
          [roomId]: messages
        }));
      }
    });

    socket.on('userJoined', (userId) => {
      setOnlineUsers(prev => new Set([...prev, userId]));
    });

    socket.on('userLeft', (userId) => {
      setOnlineUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    });

    return () => {
      socket.off('message');
      socket.off('recentMessages');
      socket.off('userJoined');
      socket.off('userLeft');
    };
  }, [socket]);

  const fetchChatRooms = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/chat/rooms/${userId}`);
      const data = await response.json();
      setActiveChats(data);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (roomId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/chat/messages/${roomId}`);
      const data = await response.json();
      setMessages(prev => ({
        ...prev,
        [roomId]: data
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const startChat = (userId1, userId2, userType) => {
    // Create a unique room ID by sorting and joining the user IDs
    const participants = [userId1, userId2].sort();
    const roomId = `chat_${participants.join('_')}`;

    // Join the room
    if (socket) {
      socket.emit('joinRoom', { room: roomId, userId: userId1, userType });
    }

    setCurrentChatRoom(roomId);
    return roomId;
  };

  const sendMessage = (roomId, userId, content) => {
    if (!socket || !roomId) return;

    const message = {
      room: roomId,
      message: {
        userId,
        content,
        timestamp: new Date().toISOString()
      }
    };

    socket.emit('message', message);
  };

  const value = {
    socket,
    activeChats,
    currentChatRoom,
    messages,
    onlineUsers,
    loading,
    startChat,
    sendMessage,
    setCurrentChatRoom,
    fetchChatRooms,
    fetchMessages
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
