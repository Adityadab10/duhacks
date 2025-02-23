import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Mail, Phone, MapPin, Briefcase, 
  DollarSign, Globe, FileText, CheckCircle,
  X, Camera, Edit2, Save, AlertCircle, Github
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FreelancerProfile = ({ isNewUser = false }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [firebaseUID, setFirebaseUID] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.photoURL)
  useEffect(() => {
    const fetchFreelancerProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const response = await axios.get(`http://localhost:4000/api/profile/${user.uid}`);
        setProfile(response.data);
        setFirebaseUID(user.uid);
        setEditedValues(response.data);
      } catch (error) {
        console.error("Error fetching freelancer profile:", error);
      }
    };

    fetchFreelancerProfile();
  }, []);

  const calculateCompletion = () => {
    if (!profile) return 0;
    
    const requiredFields = {
      name: profile.name,
      email: profile.email,
      bio: profile.bio,
      hourlyRate: profile.hourlyRate > 0,
      github: profile.github,
      portfolio: profile.portfolio,
      skills: Array.isArray(profile.skills) && profile.skills.length > 0,
      resume: profile.resume
    };

    const completedFields = Object.values(requiredFields).filter(Boolean).length;
    return Math.round((completedFields / Object.keys(requiredFields).length) * 100);
  };

  const handleFieldEdit = (field) => {
    setActiveField(field);
  };

  const handleFieldSave = async (field) => {
    try {
      await axios.put(`http://localhost:4000/api/profile/${firebaseUID}`, editedValues);
      setProfile(editedValues);
      setActiveField(null);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (field, value) => {
    setEditedValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillAdd = () => {
    const skill = document.getElementById('skillInput').value.trim();
    if (skill && (!editedValues.skills || !editedValues.skills.includes(skill))) {
      setEditedValues(prev => ({
        ...prev,
        skills: [...(prev.skills || []), skill]
      }));
      document.getElementById('skillInput').value = '';
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setEditedValues(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  if (!profile) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  const EditableField = ({ field, value, label, icon: Icon, type = "text", editable = true }) => (
    <div className="mb-6 relative group">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-700 mb-2">
          {Icon && <Icon size={18} className="mr-2" />}
          <span className="font-medium">{label}</span>
        </div>
        {editable && (
          <button
            onClick={() => activeField === field ? handleFieldSave(field) : handleFieldEdit(field)}
            className="text-sm px-3 py-1 rounded-md transition-colors hover:bg-gray-100"
          >
            {activeField === field ? <Save size={16} /> : <Edit2 size={16} />}
          </button>
        )}
      </div>
      {activeField === field && editable ? (
        <input
          type={type}
          value={editedValues[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />
      ) : (
        <div className="px-4 py-2 bg-gray-50 rounded-md">{value || 'Not set'}</div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={profile.profilePicture || (user && user.photoURL) || "https://via.placeholder.com/100"}
                  alt={profile.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" size={24} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
              <p className="text-gray-600">{profile.email}</p>
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <CheckCircle size={14} className="mr-1" /> Available for work
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Alert */}
        {calculateCompletion() < 100 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="text-yellow-400 mr-3" size={20} />
              <p className="text-sm text-yellow-700">
                Your profile is {calculateCompletion()}% complete. Complete your profile to increase visibility.
              </p>
            </div>
          </div>
        )}

        {/* Main Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <EditableField
                field="email"
                value={profile.email}
                label="Email"
                icon={Mail}
                type="email"
                editable={false}
              />
              <EditableField
                field="portfolio"
                value={profile.portfolio}
                label="Portfolio URL"
                icon={Globe}
              />
              <EditableField
                field="github"
                value={profile.github}
                label="GitHub Profile"
                icon={Github}
              />
              <EditableField
                field="bio"
                value={profile.bio}
                label="Bio"
                icon={FileText}
                type="textarea"
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Professional Details</h2>
              <EditableField
                field="hourlyRate"
                value={`$${profile.hourlyRate}/hr`}
                label="Hourly Rate"
                icon={DollarSign}
                type="number"
              />
              <EditableField
                field="availability"
                value={profile.availability}
                label="Availability"
                icon={Briefcase}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Skills</h2>
                {activeField === 'skills' ? (
                  <button
                    onClick={() => handleFieldSave('skills')}
                    className="text-sm px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Save Skills
                  </button>
                ) : (
                  <button
                    onClick={() => handleFieldEdit('skills')}
                    className="text-sm px-3 py-1 rounded-md hover:bg-gray-100"
                  >
                    <Edit2 size={16} />
                  </button>
                )}
              </div>
              
              {activeField === 'skills' && (
                <div className="mb-4">
                  <div className="flex gap-2">
                    <input
                      id="skillInput"
                      type="text"
                      placeholder="Add a skill"
                      className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSkillAdd}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {editedValues.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
                  >
                    {skill}
                    {activeField === 'skills' && (
                      <button
                        onClick={() => handleSkillRemove(skill)}
                        className="ml-2 hover:text-blue-900"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Resume</h2>
              <EditableField
                field="resume"
                value={profile.resume}
                label="Resume"
                icon={FileText}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;