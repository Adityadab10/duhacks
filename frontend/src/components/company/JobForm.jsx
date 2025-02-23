import React, { useState } from "react";
import { Button, Input, Textarea } from "@/components/ui/index";
import { X } from "lucide-react";

// Predefined tags for consistency
const AVAILABLE_TAGS = [
  "React", "Angular", "Vue", "Node.js", "Python", "Java", "JavaScript",
  "Frontend", "Backend", "Full Stack", "DevOps", "UI/UX", "Mobile",
  "AWS", "Database", "AI/ML", "Blockchain", "Cloud", "Security"
];

const JobForm = ({ addJob, onClose }) => {
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    type: "Full-time",
    company: "Your Company",
    salary: "",
    location: "",
    tags: []
  });
  const [tagInput, setTagInput] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newJob.title && newJob.description) {
      const jobToAdd = {
        ...newJob,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        applications: []
      };

      const existingJobs = JSON.parse(localStorage.getItem('jobs')) || [];
      const updatedJobs = [...existingJobs, jobToAdd];
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));

      addJob(jobToAdd);
      setNewJob({
        title: "",
        description: "",
        type: "Full-time",
        company: "Your Company",
        salary: "",
        location: "",
        tags: []
      });

      if (onClose) onClose();
    }
  };

  const handleTagInput = (e) => {
    const input = e.target.value;
    setTagInput(input);

    // Filter available tags based on input
    if (input.trim()) {
      const filtered = AVAILABLE_TAGS.filter(tag => 
        tag.toLowerCase().includes(input.toLowerCase()) &&
        !newJob.tags.includes(tag)
      );
      setSuggestedTags(filtered);
    } else {
      setSuggestedTags([]);
    }
  };

  const addTag = (tag) => {
    if (!newJob.tags.includes(tag)) {
      setNewJob(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
    setTagInput("");
    setSuggestedTags([]);
  };

  const removeTag = (tagToRemove) => {
    setNewJob(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a New Position</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
            Job Title
          </label>
          <Input
            id="jobTitle"
            type="text"
            placeholder="e.g. Senior Frontend Developer"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            className="w-full focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="jobType" className="text-sm font-medium text-gray-700">
            Job Type
          </label>
          <select
            id="jobType"
            value={newJob.type}
            onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="salary" className="text-sm font-medium text-gray-700">
            Salary Range
          </label>
          <Input
            id="salary"
            type="text"
            placeholder="e.g. $80,000 - $100,000"
            value={newJob.salary}
            onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
            className="w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium text-gray-700">
            Location
          </label>
          <Input
            id="location"
            type="text"
            placeholder="e.g. New York, NY (or Remote)"
            value={newJob.location}
            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
            className="w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Skills & Technologies
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {newJob.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="relative">
            <Input
              type="text"
              value={tagInput}
              onChange={handleTagInput}
              placeholder="Type to search skills (e.g. React, Python)"
              className="w-full focus:ring-2 focus:ring-blue-500"
            />
            {suggestedTags.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto">
                {suggestedTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="jobDescription" className="text-sm font-medium text-gray-700">
            Job Description
          </label>
          <Textarea
            id="jobDescription"
            placeholder="Describe the role, requirements, and responsibilities..."
            value={newJob.description}
            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            className="w-full h-32 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 transition-colors duration-200"
        >
          Create Position
        </Button>
      </form>
    </div>
  );
};

export default JobForm;