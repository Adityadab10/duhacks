import React from 'react';
import { useChat } from '../context/ChatContext';
import { MessageCircle, Circle } from 'lucide-react';

const ChatList = ({ userId, onChatSelect }) => {
  const { activeChats, startChat } = useChat();

  const handleChatSelect = (partnerId) => {
    startChat(userId, partnerId);
    if (onChatSelect) {
      onChatSelect();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <MessageCircle className="w-5 h-5 mr-2" />
        Active Chats
      </h3>
      
      <div className="space-y-2">
        {activeChats.length > 0 ? (
          activeChats.map((chat) => (
            <button
              key={chat.roomId}
              onClick={() => handleChatSelect(chat.partnerId)}
              className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-semibold">
                  {chat.partnerId.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900">User {chat.partnerId}</p>
                <p className="text-sm text-gray-500">Click to open chat</p>
              </div>
              <Circle className="w-2 h-2 text-green-500 fill-current" />
            </button>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No active chats
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
