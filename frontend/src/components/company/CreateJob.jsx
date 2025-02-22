import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Briefcase, Clock, IndianRupee, FileText } from "lucide-react";

const CreateJobOpening = () => {
  const navigate = useNavigate();
  const jobTitleRef = useRef();
  const descriptionRef = useRef();
  const payRef = useRef();
  const timeRequiredRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      jobTitle: jobTitleRef.current.value,
      description: descriptionRef.current.value,
      pay: payRef.current.value,
      timeRequired: timeRequiredRef.current.value
    };
    console.log(formData);
    navigate("/dashboard");
  };

  return (
    <div className="bg-gray-50 py-6 mt-20"> {/* Added mt-20 for navbar space */}
      <div className="max-w-2xl mx-auto px-4"> {/* Reduced max-width */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4"> {/* Reduced padding */}
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center text-white/90 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-white mt-2">Create a Job Opening</h1>
            <p className="text-blue-100 mt-1 text-sm">Fill in the details below to post a new job</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4"> {/* Reduced padding and spacing */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-1 text-sm">
                  <Briefcase size={16} className="mr-2 text-blue-600" />
                  Job Title
                </label>
                <input
                  ref={jobTitleRef}
                  type="text"
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm"
                  placeholder="e.g. Senior Web Developer"
                  required
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-1 text-sm">
                  <FileText size={16} className="mr-2 text-blue-600" />
                  Description
                </label>
                <textarea
                  ref={descriptionRef}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm"
                  rows="4"
                  placeholder="Describe the job requirements, responsibilities, and qualifications..."
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-gray-700 font-semibold mb-1 text-sm">
                    <IndianRupee size={16} className="mr-2 text-blue-600" />
                    Pay (₹)
                  </label>
                  <input
                    ref={payRef}
                    type="number"
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm"
                    placeholder="e.g. 50000"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-700 font-semibold mb-1 text-sm">
                    <Clock size={16} className="mr-2 text-blue-600" />
                    Time Required (Hours)
                  </label>
                  <input
                    ref={timeRequiredRef}
                    type="number"
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm"
                    placeholder="e.g. 40"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
              >
                Submit Job Opening
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJobOpening;