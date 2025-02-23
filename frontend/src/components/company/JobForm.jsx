import React, { useState } from "react";
import { Button, Input, Textarea } from "@/components/ui/index";

const JobForm = ({ addJob, onClose }) => {
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    type: "Full-time",
    company: "Your Company", // You can make this dynamic later
    salary: "",
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newJob.title && newJob.description) {
      // Add timestamp and ID
      const jobToAdd = {
        ...newJob,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        applications: []
      };

      // Save to localStorage
      const existingJobs = JSON.parse(localStorage.getItem('jobs')) || [];
      const updatedJobs = [...existingJobs, jobToAdd];
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));

      // Call parent's addJob function
      addJob(jobToAdd);

      // Reset form
      setNewJob({
        title: "",
        description: "",
        type: "Full-time",
        company: "Your Company",
        salary: "",
        location: "",
      });

      // Close form if provided
      if (onClose) onClose();
    }
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