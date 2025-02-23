import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Share2, ArrowRight, Star, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import ChatDrawer from '../ChatDrawer';
import ChatList from '../ChatList';
import { useChat } from '../../context/ChatContext';

const ScrollableCategories = ({ categories }) => {
  const scrollRef = useRef(null);
  const [showProgress, setShowProgress] = useState(false);
  const navigate = useNavigate();

  const progressOptions = [
    { label: "Just Started", value: "20%" },
    { label: "In Progress", value: "50%" },
    { label: "Almost Done", value: "80%" },
    { label: "Completed", value: "100%" }
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 bg-white rounded-full p-1 shadow-lg"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <div 
          ref={scrollRef} 
          className="flex overflow-x-hidden scroll-smooth gap-4 px-8"
        >
          {categories.map((category) => (
            <div key={category.name} className="min-w-[250px] bg-white rounded-lg p-4 flex-none">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-[#2F4156]">{category.name}</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowProgress(!showProgress)} 
                    className="text-[#567C8D] hover:text-[#2F4156]"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button className="text-[#567C8D] hover:text-[#2F4156]">
                    <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[#567C8D]">{category.price}</span>
                <span className="text-sm text-[#567C8D]">{category.count} jobs</span>
              </div>
              
              {showProgress && (
                <div className="mt-2">
                  <select className="w-full p-1 text-sm border rounded">
                    {progressOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label} - {option.value}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 bg-white rounded-full p-1 shadow-lg"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const FreelancerDashboard = () => {
  const [activeCategory, setActiveCategory] = useState('Web Design');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [showChatList, setShowChatList] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    displayName: '',
    photoURL: null,
    email: ''
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const { startChat } = useChat();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData({
          displayName: user.displayName || 'Update your name',
          photoURL: user.photoURL,
          email: user.email
        });
      } else {
        navigate('/freelancer/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Retrieve the stored JSON string from localStorage
const userDataString = localStorage.getItem("user"); // Replace with your actual key

// Parse the JSON string into an object
if (userDataString) {
  const userData = JSON.parse(userDataString);
  const firebaseUID = userData.Uid
const email = userData.email 
const name = userData.displayName
const photoURL = userData.photoURL
console.log(firebaseUID,email,name,photoURL)
  // Access specific properties like email
  // console.log("User Email:", userData);
} else {
  console.log("No user data found in localStorage");
}


  const categories = [
    { name: 'Web Design', price: '450$', count: '15' },
    { name: 'App Design', price: '300$', count: '8' },
    
  ];

  const projects = [
    {
      title: 'Web Design Project',
      description: 'I need a web design for my company. I need the design in Figma files followed by a prototype.',
      tags: ['UI Design', 'Web Design', 'prototyping'],
      budget: '450$',
      deadline: '2025-03-01'
    },
    {
      title: 'E-commerce Website',
      description: 'Looking for an experienced web designer to create a modern e-commerce platform with responsive design.',
      tags: ['E-commerce', 'Web Design', 'Responsive'],
      budget: '600$',
      deadline: '2025-02-28'
    },
    {
      title: 'Web Design Project',
      description: 'I need a web design for my company. I need the design in Figma files followed by a prototype.',
      tags: ['UI Design', 'Web Design', 'prototyping'],
      budget: '450$',
      deadline: '2025-03-05'
    },
  
  ];

  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  
  const getCurrentPageProjects = () => {
    const start = currentPage * projectsPerPage;
    const end = start + projectsPerPage;
    return projects.slice(start, end);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleStartChat = (companyId) => {
    startChat(userId, companyId);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5EEEB] pt-11">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Profile Section */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={userData.photoURL || "https://via.placeholder.com/100"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full mb-4"
                />
                <h2 className="text-xl font-bold text-[#2F4156]">{userData.displayName}</h2>
                <p className="text-[#567C8D]">{userData.email}</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#567C8D]">Avg Earnings</span>
                  <span className="font-bold text-[#2F4156]">500$</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#567C8D]">Projects Completed</span>
                  <span className="font-bold text-[#2F4156]">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#567C8D]">Rating</span>
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Statistics Section */}
              <div className="bg-white rounded-lg p-6 shadow-lg mt-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#567C8D]">Total Applications</span>
                    <span className="font-bold text-[#2F4156]">50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#567C8D]">Hired Jobs</span>
                    <span className="font-bold text-[#2F4156]">20</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#567C8D]">Completion Rate</span>
                    <span className="font-bold text-[#2F4156]">80%</span>
                  </div>
                  <button className="bg-[#2F4156] text-white px-4 py-2 rounded-md hover:bg-[#567C8D] transition-colors w-full">
                    Track All Applications
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-3 space-y-8">
            {/* Working On Section */}
            <div>
              <h2 className="text-xl font-bold text-[#2F4156] mb-4">Working On</h2>
              <ScrollableCategories categories={categories} />
            </div>

            {/* Search and Sort Section */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-semibold">Browse Jobs</div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by company or title"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F4156]"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F4156]"
                >
                  <option value="">Sort By</option>
                  <option value="deadline">Deadline</option>
                  <option value="price">Price</option>
                </select>
              </div>
            </div>

            {/* Browse Projects */}
            <div>
              <div className="space-y-4">
                {getCurrentPageProjects().map((project, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-[#2F4156]">{project.title}</h3>
                      <span className="text-[#567C8D] font-bold">{project.budget}</span>
                    </div>
                    <p className="text-[#567C8D] mb-4">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="bg-[#C8D9E6] text-[#2F4156] px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="text-[#2F4156] hover:text-[#567C8D] flex items-center">
                        Details <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination Controls */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`flex items-center px-4 py-2 rounded-md ${
                    currentPage === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-[#2F4156] hover:bg-[#C8D9E6]'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5 mr-2" /> Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`flex items-center px-4 py-2 rounded-md ${
                    currentPage === totalPages - 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-[#2F4156] hover:bg-[#C8D9E6]'
                  }`}
                >
                  Next <ChevronRight className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Components */}
      <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 9999 }}>
      

        <button
          onClick={() => setShowChatList(!showChatList)}
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#2563eb',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <MessageCircle color="white" size={24} />
        </button>

        {showChatList && !selectedChat && (
          <div className="absolute bottom-16 left-0 w-72 bg-white rounded-lg shadow-xl" style={{ zIndex: 9999 }}>
            <div className="p-4 border-b">
              <h3 className="font-semibold">Messages</h3>
            </div>
            <div className="p-2">
              {activeChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleStartChat(chat.id)}
                  className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div>
                      <span className="font-medium">{chat.name}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedChat && (
          <div className="absolute bottom-16 left-0 w-80 bg-white rounded-t-lg shadow-xl" style={{ zIndex: 9999 }}>
            <div className="flex items-center justify-between p-3 border-b">
              <h3 className="font-semibold">
                {activeChats.find(chat => chat.id === selectedChat)?.name || "Chat"}
              </h3>
              <button 
                onClick={handleCloseChat}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="h-96">
              <ChatApp userId={userId} partnerId={selectedChat} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerDashboard;