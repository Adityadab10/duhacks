import React, { useState } from 'react';
import { Camera, Edit2, Save, X, Plus, Trash2, Star, Briefcase, Clock, DollarSign } from 'lucide-react';

const FreelancerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Smith',
    title: 'Senior Web Developer',
    hourlyRate: 45,
    location: 'New York, USA',
    availability: 'Full-time',
    bio: 'Experienced web developer with 5+ years of experience in building modern web applications. Specialized in React, Node.js, and cloud technologies.',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
    education: [
      {
        degree: 'BS Computer Science',
        school: 'University of Technology',
        year: '2019'
      }
    ],
    experience: [
      {
        title: 'Senior Developer',
        company: 'Tech Solutions Inc.',
        period: '2020 - Present',
        description: 'Leading frontend development team and implementing modern web solutions.'
      }
    ]
  });

  const [newSkill, setNewSkill] = useState('');

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically make an API call to update the profile
    console.log('Profile updated:', profile);
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !profile.skills.includes(newSkill)) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill !== skillToRemove)
    });
  };

  return (
    <div className="min-h-screen bg-[#F5EEEB] py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#2F4156] to-[#C8D9E6] h-32"></div>
          <div className="px-6 py-4 relative">
            <div className="absolute -top-16 left-6">
              <div className="relative">
                <img
                  src="/api/placeholder/128/128"
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-[#2F4156] text-white p-2 rounded-full hover:bg-[#567C8D]">
                    <Camera size={20} />
                  </button>
                )}
              </div>
            </div>
            
            <div className="ml-40 flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-[#2F4156]">{profile.name}</h1>
                <p className="text-[#567C8D]">{profile.title}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-[#2F4156] text-white px-4 py-2 rounded-md hover:bg-[#567C8D] flex items-center gap-2"
              >
                {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="mt-8 grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-1 space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-[#2F4156] mb-4">Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Star className="text-[#567C8D]" size={20} />
                  <div>
                    <p className="text-sm text-[#567C8D]">Rating</p>
                    <p className="font-semibold text-[#2F4156]">4.8/5.0</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="text-[#567C8D]" size={20} />
                  <div>
                    <p className="text-sm text-[#567C8D]">Projects</p>
                    <p className="font-semibold text-[#2F4156]">85 Completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-[#567C8D]" size={20} />
                  <div>
                    <p className="text-sm text-[#567C8D]">Hours</p>
                    <p className="font-semibold text-[#2F4156]">2,450+</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="text-[#567C8D]" size={20} />
                  <div>
                    <p className="text-sm text-[#567C8D]">Hourly Rate</p>
                    <p className="font-semibold text-[#2F4156]">${profile.hourlyRate}/hr</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-[#2F4156] mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-[#C8D9E6] text-[#2F4156] px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {skill}
                    {isEditing && (
                      <button onClick={() => removeSkill(skill)} className="hover:text-red-500">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <form onSubmit={addSkill} className="flex-1 min-w-full mt-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill"
                        className="flex-1 px-3 py-1 border rounded-md focus:outline-none focus:border-[#2F4156]"
                      />
                      <button
                        type="submit"
                        className="bg-[#2F4156] text-white p-2 rounded-md hover:bg-[#567C8D]"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-[#2F4156] mb-4">About</h2>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full p-3 border rounded-md focus:outline-none focus:border-[#2F4156]"
                  rows={4}
                />
              ) : (
                <p className="text-[#567C8D]">{profile.bio}</p>
              )}
            </div>

            {/* Experience */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-[#2F4156] mb-4">Experience</h2>
              {profile.experience.map((exp, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[#2F4156]">{exp.title}</h3>
                      <p className="text-[#567C8D]">{exp.company}</p>
                      <p className="text-sm text-[#567C8D]">{exp.period}</p>
                    </div>
                    {isEditing && (
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                  <p className="text-[#567C8D] mt-2">{exp.description}</p>
                </div>
              ))}
              {isEditing && (
                <button className="mt-4 text-[#2F4156] hover:text-[#567C8D] flex items-center gap-2">
                  <Plus size={20} />
                  Add Experience
                </button>
              )}
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-[#2F4156] mb-4">Education</h2>
              {profile.education.map((edu, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[#2F4156]">{edu.degree}</h3>
                      <p className="text-[#567C8D]">{edu.school}</p>
                      <p className="text-sm text-[#567C8D]">{edu.year}</p>
                    </div>
                    {isEditing && (
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isEditing && (
                <button className="mt-4 text-[#2F4156] hover:text-[#567C8D] flex items-center gap-2">
                  <Plus size={20} />
                  Add Education
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;