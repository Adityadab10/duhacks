import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Briefcase, 
  Book, DollarSign, Globe, FileText, CheckCircle,
  X, Camera
} from 'lucide-react';

const ProfileSetup = () => {
  const [profile, setProfile] = useState({
    basicInfo: {
      fullName: 'John Doe',
      email: 'john@example.com',
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

  // Calculate completion percentage
  const calculateCompletion = () => {
    let completed = 0;
    let total = 0;

    // Basic Info checks
    const basicFields = Object.values(profile.basicInfo);
    completed += basicFields.filter(val => val && val !== '').length;
    total += basicFields.length;

    // Professional Info checks
    const profFields = Object.values(profile.professionalInfo);
    completed += profFields.filter(val => val && val !== '').length;
    total += profFields.length;

    // Education and Work Preferences
    completed += profile.education.length > 0 ? 1 : 0;
    total += 1;
    
    const prefFields = Object.values(profile.workPreferences);
    completed += prefFields.filter(val => val && val !== '').length;
    total += prefFields.length;

    return Math.round((completed / total) * 100);
  };

  const completionPercentage = calculateCompletion();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Profile Completion</h2>
            <span className="text-lg font-bold text-blue-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          {completionPercentage < 100 && (
            <p className="mt-4 text-sm text-gray-600">
              Complete your profile to increase your chances of getting hired!
            </p>
          )}
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <div className="px-6 py-4 relative">
            <div className="absolute -top-16 left-6">
              <div className="relative group">
                <img
                  src="/api/placeholder/128/128"
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={20} />
                </button>
              </div>
            </div>
            <div className="ml-40">
              <h1 className="text-2xl font-bold text-gray-800">{profile.basicInfo.fullName}</h1>
              <p className="text-gray-600">{profile.professionalInfo.title}</p>
            </div>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
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
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.professionalInfo.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">About Me</h2>
              <p className="text-gray-600">
                {profile.professionalInfo.bio || 'Add a bio to tell clients about yourself'}
              </p>
            </div>

            {/* Work Preferences */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Work Preferences</h2>
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
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Portfolio & Documents</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Globe size={18} className="mr-3" />
                  <span>{profile.professionalInfo.portfolio || 'Add portfolio URL'}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FileText size={18} className="mr-3" />
                  <span>Upload Resume</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;