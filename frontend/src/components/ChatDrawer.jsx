import React, { useEffect } from 'react';
import ChatApp from './ChatApp';
import { useChat } from '../context/ChatContext';
import { X } from 'lucide-react';

const ChatDrawer = ({ userId, isOpen, onClose }) => {
  const { currentChatRoom, messages, fetchMessages } = useChat();

  useEffect(() => {
    if (currentChatRoom && isOpen) {
      fetchMessages(currentChatRoom);
    }
  }, [currentChatRoom, isOpen, fetchMessages]);

  if (!isOpen || !currentChatRoom) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Chat</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <ChatApp
            userId={userId}
            chatRoom={currentChatRoom}
            messages={messages[currentChatRoom] || []}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatDrawer;
