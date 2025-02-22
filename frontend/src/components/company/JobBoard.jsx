import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import JobCard from "./JobCard";
import JobForm from "./JobForm";

const JobBoard = ({ onChatWithFreelancer }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch jobs from localStorage or API
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(storedJobs);

    // Fetch applications
    const storedApplications = JSON.parse(localStorage.getItem('applications')) || [];
    setApplications(storedApplications);
  }, []);

  const addJob = (newJob) => {
    setJobs([...jobs, { ...newJob, id: jobs.length + 1 }]);
  };

  return (
    <div className="space-y-6">
      {jobs.map((job) => {
        const jobApplications = applications.filter(app => app.jobId === job.id);
        
        return (
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
            
            <div className="prose prose-sm text-gray-500 mb-4">
              <p>{job.description}</p>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Applications ({jobApplications.length})</h4>
              <div className="space-y-3">
                {jobApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{application.freelancerName}</p>
                      <p className="text-sm text-gray-500">{application.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onChatWithFreelancer(application.freelancerId)}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat</span>
                      </button>
                    </div>
                  </div>
                ))}
                {jobApplications.length === 0 && (
                  <p className="text-gray-500 text-center py-2">No applications yet</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {jobs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No job postings yet. Create your first job posting!
        </div>
      )}
      <JobForm addJob={addJob} />
    </div>
  );
};

export default JobBoard;