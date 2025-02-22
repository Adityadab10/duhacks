import React, { useState } from "react";
import { Button, Input, Textarea } from "@/components/ui/index";

const JobForm = ({ addJob }) => {
  const [newJob, setNewJob] = useState({ title: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newJob.title && newJob.description) {
      addJob(newJob);
      setNewJob({ title: "", description: "" });
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
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 transition-colors duration-200"
        >
          Post New Position
        </Button>
      </form>
    </div>
  );
};


export default JobForm