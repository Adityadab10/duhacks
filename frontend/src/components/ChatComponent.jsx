import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import ChatApp from './ChatApp';

const ChatComponent = ({ selectedChat, setSelectedChat, activeChats, setActiveChats, userData }) => {
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [newChatUser, setNewChatUser] = useState('');

  const handleCreateChat = () => {
    if (!newChatUser.trim()) return;
    const newChat = { id: Date.now(), name: newChatUser };
    setActiveChats([...activeChats, newChat]);
    setSelectedChat(newChat);
    setIsCreatingChat(false);
    setNewChatUser('');
  };

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 overflow-y-auto">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h3 className="font-semibold">Chats</h3>
        <button onClick={() => setIsCreatingChat(true)} className="text-gray-500 hover:text-gray-700">
          <Plus size={20} />
        </button>
      </div>
      {selectedChat && (
        <div>
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h3 className="font-semibold">Chat with {selectedChat.name}</h3>
            <button onClick={() => setSelectedChat(null)} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          <ChatApp userId={userData.email} partnerId={selectedChat.id} />
        </div>
      )}

      {isCreatingChat && (
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
          <input
            type="text"
            placeholder="Enter user name or email"
            value={newChatUser}
            onChange={(e) => setNewChatUser(e.target.value)}
            className="w-full p-2 border rounded-md mb-2"
          />
          <button onClick={handleCreateChat} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Start Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
