import { useState } from 'react';

const CreateJob = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [jobData, setJobData] = useState({
    jobTitle: '',
    pay: '',
    time: '',
    skills: '',
    description: '',
    companyId: ''
  });

  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!jobData.jobTitle.trim()) {
      errors.jobTitle = 'Job title is required';
    }
    
    if (!jobData.time) {
      errors.time = 'Time is required';
    }
    
    if (!jobData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (jobData.pay && isNaN(jobData.pay)) {
      errors.pay = 'Pay must be a valid number';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Get user data from localStorage
      const userData = localStorage.getItem("userData");
      if (!userData) {
        throw new Error('Please login again');
      }

      const parsedUserData = JSON.parse(userData);
      // Try both possible ID fields
      const companyId = parsedUserData._id || parsedUserData.id;

      if (!companyId) {
        throw new Error('Company ID not found. Please login again.');
      }

      const formattedData = {
        jobTitle: jobData.jobTitle.trim(),
        pay: jobData.pay ? Number(jobData.pay) : undefined,
        time: new Date(jobData.time).toISOString(),
        skills: jobData.skills ? jobData.skills.split(',').map(skill => skill.trim()).filter(Boolean) : [],
        description: jobData.description.trim(),
        companyId: companyId,
        status: "available"
      };

      console.log('Sending job data:', formattedData); // Debug log

      const response = await axios.post('http://localhost:4000/api/jobs', formattedData);

      if (response.data) {
        setSuccess(true);
        setJobData({
          jobTitle: '',
          pay: '',
          time: '',
          skills: '',
          description: '',
          companyId: companyId // Keep the company ID
        });
        
        // Navigate after short delay
        setTimeout(() => {
          navigate('/company/dashboard');
        }, 1500);
      }
    } catch (err) {
      console.error('Error creating job:', err.response?.data || err.message);
      setError(
        err.response?.data?.message || 
        err.response?.data?.error || 
        err.message || 
        'Failed to create job. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create a Job</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
          Job created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title *
          </label>
          <input
            type="text"
            name="jobTitle"
            value={jobData.jobTitle}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              validationErrors.jobTitle ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {validationErrors.jobTitle && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.jobTitle}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pay
          </label>
          <input
            type="number"
            name="pay"
            value={jobData.pay}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              validationErrors.pay ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {validationErrors.pay && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.pay}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time *
          </label>
          <input
            type="datetime-local"
            name="time"
            value={jobData.time}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              validationErrors.time ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {validationErrors.time && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.time}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills (comma-separated)
          </label>
          <input
            type="text"
            name="skills"
            value={jobData.skills}
            onChange={handleChange}
            className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description *
          </label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full p-2 border rounded-md ${
              validationErrors.description ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {validationErrors.description && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company ID *
          </label>
          <input
            type="text"
            name="companyId"
            value={jobData.companyId}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              validationErrors.companyId ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {validationErrors.companyId && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.companyId}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-2 rounded-md text-white font-medium
            ${isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
            }
          `}
        >
          {isSubmitting ? 'Creating...' : 'Create Job'}
        </button>
      </form>
    </div>
  );
};

export default CreateJob;