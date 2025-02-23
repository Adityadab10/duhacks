import React, { useState, useEffect } from 'react';
import { MessageCircle, Search, X } from 'lucide-react';
import JobForm from "./JobForm";

// Same tags as in JobForm for consistency
const AVAILABLE_TAGS = [
  "React", "Angular", "Vue", "Node.js", "Python", "Java", "JavaScript",
  "Frontend", "Backend", "Full Stack", "DevOps", "UI/UX", "Mobile",
  "AWS", "Database", "AI/ML", "Blockchain", "Cloud", "Security"
];

const JobBoard = ({ onChatWithFreelancer }) => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showJobForm, setShowJobForm] = useState(false);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(storedJobs);
  };

  const addJob = (newJob) => {
    setJobs(prevJobs => [...prevJobs, newJob]);
    setShowJobForm(false);
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getSuggestedTags = () => {
    return AVAILABLE_TAGS.filter(tag => 
      !selectedTags.includes(tag) &&
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredJobs = jobs
    .filter(job => {
      // If there are selected tags, job must match ALL selected tags
      if (selectedTags.length > 0) {
        const hasAllTags = selectedTags.every(tag => 
          job.tags && job.tags.includes(tag)
        );
        if (!hasAllTags) return false;
      }

      // Then filter by search term if present
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        (job.tags && job.tags.some(tag => 
          tag.toLowerCase().includes(searchLower)
        ))
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Browse Jobs</h2>
          <button
            onClick={() => setShowJobForm(true)}
            className="px-4 py-2 bg-[#2F4156] text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Post a New Job
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowTagSuggestions(true);
                }}
                onFocus={() => setShowTagSuggestions(true)}
                placeholder="Search by title, company, or skills" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {showTagSuggestions && searchTerm && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto">
                  {getSuggestedTags().map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        toggleTag(tag);
                        setSearchTerm("");
                        setShowTagSuggestions(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {/* Selected Tags */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedTags.map(tag => (
                <span 
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>

        {showJobForm ? (
          <div className="mb-8">
            <JobForm addJob={addJob} onClose={() => setShowJobForm(false)} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow p-6 border border-gray-200">
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
                      <span className="font-medium">Salary:</span> {job.salary}
                    </p>
                  )}
                  {job.location && (
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Location:</span> {job.location}
                    </p>
                  )}
                </div>

                {/* Tags */}
                {job.tags && job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="prose prose-sm text-gray-500 mb-4">
                  <p>{job.description}</p>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Applications ({job.applications?.length || 0})
                  </h4>
                  <div className="space-y-3">
                    {job.applications?.map((application) => (
                      <div key={application.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{application.freelancerName}</p>
                          <p className="text-sm text-gray-500">{application.email}</p>
                        </div>
                        <button
                          onClick={() => onChatWithFreelancer(application.freelancerId)}
                          className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Chat</span>
                        </button>
                      </div>
                    ))}
                    {(!job.applications || job.applications.length === 0) && (
                      <p className="text-gray-500 text-center py-2">No applications yet</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filteredJobs.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                {selectedTags.length > 0 
                  ? `No jobs match the selected tags: ${selectedTags.join(", ")}`
                  : searchTerm 
                    ? 'No jobs match your search' 
                    : 'No job postings yet. Create your first job posting!'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBoard;
