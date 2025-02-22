import React from "react";
import { Star } from "lucide-react";

const profiles = [
  { id: 1, name: "Syed", specialization: "Amazon Listing Expert", rating: 5.0, reviews: 105, price: 2729, profilePic: "/images/profile1.jpg" },
  { id: 2, name: "Shadestech", specialization: "Alibaba Account Specialist", rating: 5.0, reviews: 16, price: 910, profilePic: "/images/profile2.jpg" },
  { id: 3, name: "Allah Ditta", specialization: "Amazon FBA Fixer", rating: 4.9, reviews: 18, price: 910, profilePic: "/images/profile3.jpg" },
  { id: 4, name: "Ammar Mukhtiar", specialization: "Amazon FBA Virtual Assistant", rating: 5.0, reviews: 30, price: 1365, profilePic: "/images/profile4.jpg" },
  { id: 5, name: "Melissa", specialization: "Business & Coaching", rating: 5.0, reviews: 50, price: 2500, profilePic: "/images/profile5.jpg" },
  { id: 6, name: "Rahib Ali", specialization: "Walmart & 2-Step Dropshipping", rating: 4.8, reviews: 40, price: 2000, profilePic: "/images/profile6.jpg" },
  { id: 7, name: "Shahid Javed", specialization: "Amazon FBA Virtual Assistant", rating: 5.0, reviews: 65, price: 3000, profilePic: "/images/profile7.jpg" },
  { id: 8, name: "Ahmad", specialization: "Amazon Hijacker Removal", rating: 4.7, reviews: 20, price: 1500, profilePic: "/images/profile8.jpg" },
  { id: 9, name: "Hassan", specialization: "Shopify Store Setup", rating: 4.9, reviews: 75, price: 2800, profilePic: "/images/profile9.jpg" },
  { id: 10, name: "Elena", specialization: "SEO & Digital Marketing", rating: 5.0, reviews: 120, price: 3200, profilePic: "/images/profile10.jpg" },
  { id: 11, name: "Victor", specialization: "Etsy Store Optimization", rating: 4.6, reviews: 22, price: 1300, profilePic: "/images/profile11.jpg" },
  { id: 12, name: "Natalie", specialization: "Social Media Management", rating: 4.8, reviews: 55, price: 2700, profilePic: "/images/profile12.jpg" },
  { id: 13, name: "Arun", specialization: "Google Ads Specialist", rating: 4.7, reviews: 35, price: 2600, profilePic: "/images/profile13.jpg" },
  { id: 14, name: "Sophia", specialization: "E-commerce Branding", rating: 5.0, reviews: 90, price: 3100, profilePic: "/images/profile14.jpg" },
  { id: 15, name: "Daniel", specialization: "Amazon PPC Ads Expert", rating: 4.9, reviews: 80, price: 2900, profilePic: "/images/profile15.jpg" },
  { id: 16, name: "Mike", specialization: "Dropshipping Store Builder", rating: 4.8, reviews: 45, price: 2500, profilePic: "/images/profile16.jpg" },
];

const ProfileGrid = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Freelance Experts</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <div key={profile.id} className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:-translate-y-2 border border-gray-200">
            {/* Profile Image */}
            <img src={profile.profilePic} alt={profile.name} className="w-full h-40 object-cover rounded-lg" />
            
            {/* Name & Specialization */}
            <h3 className="text-lg font-bold text-gray-900 mt-4">{profile.name}</h3>
            <p className="text-sm text-gray-600">{profile.specialization}</p>

            {/* Rating & Price */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <Star className="text-yellow-500" size={16} />
                <span className="ml-1 text-sm font-semibold text-gray-700">{profile.rating} ({profile.reviews})</span>
              </div>
              <span className="text-md font-semibold text-gray-800">₹{profile.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileGrid;
