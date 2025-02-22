import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, MapPin, Briefcase, 
  DollarSign, Globe, FileText, CheckCircle,
  X, Camera, Edit2, Save, AlertCircle
} from 'lucide-react';
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = ({ isNewUser = false }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(isNewUser);
  const [editingSections, setEditingSections] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const [profile, setProfile] = useState({
    basicInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      profilePicture: null
    },
    professionalInfo: {
      title: 'Frontend Developer',
      experience: '',
      rate: '',
      bio: '',
      portfolio: '',
      skills: ['React', 'JavaScript']
    },
    education: [],
    workPreferences: {
      availability: '',
      workType: '',
      categories: []
    }
  });

  const calculateCompletion = () => {
    let completed = 0;
    let total = 0;
    
    Object.entries(profile).forEach(([section, data]) => {
      if (typeof data === 'object') {
        Object.values(data).forEach(value => {
          if (Array.isArray(value)) {
            completed += value.length > 0 ? 1 : 0;
          } else {
            completed += value && value !== '' ? 1 : 0;
          }
          total += 1;
        });
      }
    });

    return Math.round((completed / total) * 100);
  };

  const EditableSection = ({ 
    section, 
    title, 
    children, 
    onEdit,
    className = "" 
  }) => {
    const isEditable = editingSections[section];

    return (
      <div className={`bg-white rounded-lg shadow p-6 relative group ${className} mb-6`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          {isEditing && (
            <button
              onClick={() => onEdit(section)}
              className={`text-gray-400 hover:text-blue-600 transition-colors ${
                !isEditable && 'opacity-0 group-hover:opacity-100'
              }`}
            >
              {isEditable ? <Save size={18} /> : <Edit2 size={18} />}
            </button>
          )}
        </div>
        <div className={isEditable ? 'opacity-100' : 'opacity-90'}>
          {children}
        </div>
      </div>
    );
  };

  const CustomAlert = ({ children }) => (
    <div className="flex items-center gap-3 p-4 mb-6 border border-yellow-200 bg-yellow-50 rounded-lg text-yellow-800">
      <AlertCircle className="h-4 w-4" />
      <div className="text-sm">{children}</div>
    </div>
  );

  const toggleEdit = () => {
    if (isEditing) {
      setShowConfirmation(true);
    } else {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setEditingSections({});
    setShowConfirmation(false);
    // Here you would typically save to backend
  };

  const handleSectionEdit = (section) => {
    if (editingSections[section]) {
      setEditingSections(prev => ({ ...prev, [section]: false }));
    } else {
      setEditingSections(prev => ({ ...prev, [section]: true }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Edit Controls */}
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-2xl font-bold text-gray-800">
            {isNewUser ? 'Complete Your Profile' : 'Professional Profile'}
          </h1>
          {!isNewUser && (
            <button
              onClick={toggleEdit}
              className={`px-4 py-2 rounded-md transition-colors ${
                isEditing 
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          )}
        </div>

        {/* Completion Alert */}
        {calculateCompletion() < 100 && (
          <CustomAlert>
            Your profile is {calculateCompletion()}% complete. Add missing information to increase your chances of getting hired!
          </CustomAlert>
        )}

        {/* Profile Content */}
        <div className="flex items-center mb-6">
          <img
            src={profile.basicInfo.profilePicture || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{profile.basicInfo.fullName}</h2>
            <p className="text-gray-600">{profile.basicInfo.email}</p>
          </div>
        </div>

        <EditableSection
          section="basicInfo"
          title="Basic Information"
          onEdit={handleSectionEdit}
        >
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Mail size={18} className="mr-3" />
              <span>{profile.basicInfo.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone size={18} className="mr-3" />
              <span>{profile.basicInfo.phone || 'Add phone number'}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin size={18} className="mr-3" />
              <span>{profile.basicInfo.location || 'Add location'}</span>
            </div>
          </div>
        </EditableSection>

        <EditableSection
          section="professionalInfo"
          title="Professional Information"
          onEdit={handleSectionEdit}
        >
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Briefcase size={18} className="mr-3" />
              <span>{profile.professionalInfo.title}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign size={18} className="mr-3" />
              <span>${profile.professionalInfo.rate || '0'}/hr</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Globe size={18} className="mr-3" />
              <span>{profile.professionalInfo.portfolio || 'Add portfolio URL'}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FileText size={18} className="mr-3" />
              <span>Upload Resume</span>
            </div>
          </div>
        </EditableSection>

        <EditableSection
          section="skills"
          title="Skills"
          onEdit={handleSectionEdit}
        >
          <div className="flex flex-wrap gap-2">
            {profile.professionalInfo.skills.map((skill, index) => (
              <span key={index} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </EditableSection>

        <EditableSection
          section="workPreferences"
          title="Work Preferences"
          onEdit={handleSectionEdit}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-gray-600">
              <DollarSign size={18} className="mr-3" />
              <span>${profile.professionalInfo.rate || '0'}/hr</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Briefcase size={18} className="mr-3" />
              <span>{profile.workPreferences.workType || 'Add work type'}</span>
            </div>
          </div>
        </EditableSection>

        {/* Confirmation Dialog */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Save Changes?</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to save your profile changes? This will update your public profile.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfile;