import React, { useState } from 'react';
import { Search, Bell, ArrowRight, User, Briefcase, Layout, Star, DollarSign } from 'lucide-react';

const FreelancerDashboard = () => {
  const [activeCategory, setActiveCategory] = useState('Web Design');

  const categories = [
    { name: 'Web Design', price: '450$', count: '15' },
    { name: 'App Design', price: '300$', count: '8' },
    { name: 'Landing Page', price: '250$', count: '12' },
    { name: 'UI/UX', price: '400$', count: '10' }
  ];

  const projects = [
    {
      title: 'Web Design Project',
      description: 'I need a web design for my company. I need the design in Figma files followed by a prototype.',
      tags: ['UI Design', 'Web Design', 'prototyping'],
      budget: '450$'
    },
    {
      title: 'E-commerce Website',
      description: 'Looking for an experienced web designer to create a modern e-commerce platform with responsive design.',
      tags: ['E-commerce', 'Web Design', 'Responsive'],
      budget: '600$'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5EEEB]">

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Profile Section */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img src="/api/placeholder/96/96" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-xl font-bold text-[#2F4156]">John Smith</h2>
                <p className="text-[#567C8D] mb-4">Senior Web Developer</p>
                <button className="bg-[#2F4156] text-white px-4 py-2 rounded-md hover:bg-[#567C8D] transition-colors w-full">
                  View Profile
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#567C8D]">Avg Earnings</span>
                  <span className="font-bold text-[#2F4156]">500$</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#567C8D]">Projects Completed</span>
                  <span className="font-bold text-[#2F4156]">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#567C8D]">Rating</span>
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-3 space-y-8">
            {/* Working On Section */}
            <div>
              <h2 className="text-xl font-bold text-[#2F4156] mb-4">Working On</h2>
              <div className="grid grid-cols-4 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className={`bg-white rounded-lg p-4 cursor-pointer transition-all ${
                      activeCategory === category.name ? 'ring-2 ring-[#2F4156]' : ''
                    }`}
                    onClick={() => setActiveCategory(category.name)}
                  >
                    <h3 className="font-medium text-[#2F4156]">{category.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[#567C8D]">{category.price}</span>
                      <span className="text-sm text-[#567C8D]">{category.count} jobs</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Browse Projects */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#2F4156]">Browse Projects</h2>
                <button className="text-[#567C8D] hover:text-[#2F4156]">View All</button>
              </div>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-[#2F4156]">{project.title}</h3>
                      <span className="text-[#567C8D] font-bold">{project.budget}</span>
                    </div>
                    <p className="text-[#567C8D] mb-4">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="bg-[#C8D9E6] text-[#2F4156] px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="text-[#2F4156] hover:text-[#567C8D] flex items-center">
                        Details <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;