import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { MessageCircle, Circle, Plus, Search } from 'lucide-react';
import axios from 'axios';

const ChatList = ({ userId, onChatSelect, userRole }) => {
  const { activeChats = [] } = useChat();
  const [showNewChat, setShowNewChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChatSelect = (partnerId) => {
    if (onChatSelect) {
      onChatSelect(partnerId);
    }
    setShowNewChat(false);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        // For testing, we'll just show John Doe in search results
        setSearchResults([
          {
            id: "test-freelancer-1",
            name: "John Doe",
            title: "Full Stack Developer",
          }
        ]);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Messages
        </h3>
        <button
          onClick={() => setShowNewChat(!showNewChat)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          title="Start new chat"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {showNewChat && (
        <div className="mb-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${userRole === 'company' ? 'freelancers' : 'companies'}...`}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {searchResults.length > 0 && (
            <div className="mt-2 border rounded-lg divide-y">
              {searchResults.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleChatSelect(user.id)}
                  className="w-full flex items-center p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.title}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="space-y-2">
        {activeChats.length > 0 ? (
          activeChats.map((chat) => (
            <button
              key={chat.roomId || chat.partnerId}
              onClick={() => handleChatSelect(chat.partnerId)}
              className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-semibold">
                  {chat.partnerName ? chat.partnerName.charAt(0).toUpperCase() : "?"}
                </span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900">
                  {chat.partnerName || `User ${chat.partnerId}`}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {chat.lastMessage || "Click to start chatting"}
                </p>
              </div>
              {chat.isOnline && (
                <Circle className="w-2 h-2 text-green-500 fill-current" />
              )}
            </button>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No active chats. Click the + button to start a new chat.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
