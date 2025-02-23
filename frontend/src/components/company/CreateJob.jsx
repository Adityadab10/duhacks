import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Briefcase, Clock, IndianRupee, FileText } from "lucide-react";

const CreateJob = () => {
  const navigate = useNavigate();
  const jobTitleRef = useRef();
  const descriptionRef = useRef();
  const payRef = useRef();
  const timeRequiredRef = useRef();
  const skillsRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateJob = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = {
      JobTitle: jobTitleRef.current.value, // Match the schema (case-sensitive!)
      description: descriptionRef.current.value,
      pay: parseInt(payRef.current.value, 10) || 0,
      time: new Date(), // Save as actual Date object
      skills: skillsRef.current.value ? skillsRef.current.value.split(",").map(skill => skill.trim()) : [],
      companyId: "65d6a3b8f0d1c123456789ab", // REPLACE with real company ID from auth or state
      status: "available",
    };

    console.log("Sending job data:", formData); // Debug log

    try {
      const response = await axios.post("http://localhost:5000/company/createjob", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Job created successfully:", response.data);
      setSuccess("Job created successfully!");
      setTimeout(() => navigate("/dashboard"), 1500); // Redirect after success
    } catch (err) {
      console.error("Error creating job:", err.response ? err.response.data : err.message);
      setError("Failed to create job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-6 mt-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
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

          <div className="p-6 space-y-4">
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <div className="space-y-4">
              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-1 text-sm">
                  <Briefcase size={16} className="mr-2 text-blue-600" />
                  Job Title
                </label>
                <input
                  ref={jobTitleRef}
                  type="text"
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
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
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  rows="4"
                  placeholder="Describe the job requirements..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-1 text-sm">
                  <FileText size={16} className="mr-2 text-blue-600" />
                  Skills (comma-separated)
                </label>
                <input
                  ref={skillsRef}
                  type="text"
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  placeholder="e.g. JavaScript, React, Node.js"
                />
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
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    placeholder="e.g. 50000"
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
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    placeholder="e.g. 40"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleCreateJob}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Job Opening"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
