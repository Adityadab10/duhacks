import { useNavigate } from 'react-router-dom';

export default function Section() {
    const navigate = useNavigate();

    const handleFreelancerSignup = () => {
      navigate('/freelancer/login');
    };

    const handleCompanySignup = () => {
      navigate('/company/login');
    };

    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F5EFEB]">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Freelancer Card */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <img
                  src="/Freelancer.png" 
                  alt="Freelancer"
                  className="mx-auto mb-6 w-72 h-72 object-contain"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">I AM A FREELANCER</h2>
                <p className="text-gray-600 mb-8 text-lg">
                  I want to find jobs to apply for and work as a freelancer.
                </p>
                <button 
                  onClick={handleFreelancerSignup}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </button>
              </div>
            </div>
    
            {/* Hire Card */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <img
                  src="/Hero.png"
                  alt="Hire"
                  className="mx-auto mb-6 w-72 h-72 object-contain"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">I WANT TO HIRE</h2>
                <p className="text-gray-600 mb-8 text-lg">
                  I want to hire freelancers to work on my projects.
                </p>
                <button 
                  onClick={handleCompanySignup}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}