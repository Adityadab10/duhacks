import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Share2, ArrowRight, Star, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import ChatDrawer from '../ChatDrawer';
import ChatList from '../ChatList';
import { useChat } from '../../context/ChatContext';
import ChatComponent from '../components/ChatComponent';
import axios from 'axios';

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
  const [sortOption, setSortOption] = useState('newest');
  const [showChatList, setShowChatList] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData({
          displayName: user.displayName || 'Update your name',
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        });
      } else {
        navigate('/freelancer/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:4000/api/jobs');
        if (response.data) {
          console.log('Jobs fetched:', response.data);
          setJobs(response.data);
        } else {
          setError('No jobs found');
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err.response?.data?.message || 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();

    // Set up polling interval (every 5 seconds)
    const pollInterval = setInterval(fetchJobs, 5000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(pollInterval);
  }, []);

  const filteredAndSortedJobs = jobs
    .filter(job => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        job.title?.toLowerCase().includes(searchLower) ||
        job.company?.toLowerCase().includes(searchLower) ||
        job.description?.toLowerCase().includes(searchLower) ||
        job.skills?.some(skill => skill.toLowerCase().includes(searchLower))
      );
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-[#F5EEEB]">
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs by title, company, or skills"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">Loading jobs...</div>
          ) : error ? (
            <div className="col-span-full text-center text-red-500 py-8">{error}</div>
          ) : filteredAndSortedJobs.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">
              No jobs found matching your search criteria
            </div>
          ) : (
            filteredAndSortedJobs.map((job) => (
              <div key={job._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600 mt-1">{job.company}</p>
                  </div>
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                    {job.type}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {job.salary && (
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Salary:</span> ${job.salary}
                    </p>
                  )}
                  {job.location && (
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Location:</span> {job.location}
                    </p>
                  )}
                </div>

                <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

                {job.skills && job.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => {/* Handle apply */}}
                  className="w-full px-4 py-2 bg-[#2F4156] text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;