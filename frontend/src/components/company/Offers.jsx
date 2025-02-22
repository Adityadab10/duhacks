import React from "react";
import { Star, Globe, MessageCircle, ShoppingCart, Award, Clock, CheckCircle } from "lucide-react";

const FreelancerProfile = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-3xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-8 border-b border-gray-100 pb-8">
        <div className="relative">
          <img
            src="/api/placeholder/100/100"
            alt="Freelancer"
            className="w-28 h-28 rounded-2xl object-cover shadow-lg"
          />
          <div className="absolute -bottom-3 -right-3 bg-blue-500 text-white p-2 rounded-lg">
            <Award size={20} />
          </div>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-gray-800">Syed</h1>
            <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full flex items-center">
              <CheckCircle size={14} className="mr-1" />
              Verified
            </span>
          </div>
          
          <div className="flex items-center text-yellow-400 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} fill="currentColor" size={20} className="mr-1" />
            ))}
            <span className="ml-2 text-gray-600 font-medium">(105 Reviews)</span>
          </div>
          
          <div className="mt-3 space-y-2">
            <p className="text-gray-600 flex items-center">
              <Globe size={18} className="mr-2 text-blue-500" />
              Pakistan | English, Urdu
            </p>
            <p className="text-gray-600 flex items-center">
              <Clock size={18} className="mr-2 text-blue-500" />
              199 Orders Completed
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Amazon, Walmart, Etsy Growth Consultant
        </h2>
        <p className="text-gray-600 mt-4 leading-relaxed">
          I focus on building relationships with my clients and solving their problems.
          With years of experience in eCommerce, I can help optimize your Amazon listings,
          improve SEO, and boost your digital marketing strategy.
        </p>
      </div>

      {/* Skills */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Expertise</h3>
        <div className="flex flex-wrap gap-3">
          {[
            "Amazon Listing",
            "eBay Listing",
            "Amazon SEO",
            "Keyword Research",
            "Amazon FBA",
            "Digital Marketing",
            "Pay Per Click",
            "SEO",
          ].map((skill) => (
            <span
              key={skill}
              className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Pricing & Packages */}
      <div className="mt-10">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Pricing & Packages</h3>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h4 className="text-blue-600 font-bold text-3xl">₹2,729</h4>
              <p className="text-gray-600 mt-2">Includes 5 ASIN / 1 Variation Listing</p>
              <div className="flex items-center mt-3 text-sm text-gray-500">
                <Clock size={16} className="mr-2" />
                <span>2-3 days delivery</span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl flex items-center space-x-3 hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-200 shadow-md hover:shadow-lg w-full md:w-auto justify-center">
              <ShoppingCart size={20} />
              <span className="font-medium">Continue (₹2,729)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Button */}
      <div className="mt-8 flex justify-center">
        <button className="bg-gray-800 text-white px-8 py-4 rounded-xl flex items-center space-x-3 hover:bg-gray-900 transform hover:-translate-y-1 transition-all duration-200 shadow-md hover:shadow-lg">
          <MessageCircle size={20} />
          <span className="font-medium">Message Syed</span>
        </button>
      </div>
    </div>
  );
};

export default FreelancerProfile;