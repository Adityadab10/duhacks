import { useNavigate } from 'react-router-dom';

export default function Section() {
    const navigate = useNavigate();

    const handleFreelancerSignup = () => {
      navigate('/freelancer-login');
    };

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Freelancer Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md text-centermake ">
            <img
              src="https://png.pngtree.com/png-vector/20220217/ourmid/pngtree-man-freelancer-working-on-laptop-online-png-image_4395919.png" 
              alt="Freelancer"
              className="mx-auto mb-4 w-64 h-64 object-contain"
            />
            <h2 className="text-xl font-semibold">I AM A FREELANCER</h2>
            <p className="text-gray-500 mt-2">
              I want to find jobs to apply for and work as a freelancer.
            </p>
            <button 
              onClick={handleFreelancerSignup}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
  
          {/* Hire Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <img
              src="https://w7.pngwing.com/pngs/346/537/png-transparent-employee-human-resources-hiring-hire-vacancy-job-recruitment-employment-career-work-thumbnail.png"
              alt="Hire"
              className="mx-auto mb-4 w-64 h-64 object-contain"
            />
            <h2 className="text-xl font-semibold">I WANT TO HIRE</h2>
            <p className="text-gray-500 mt-2">
              I want to hire freelancers to work on my projects.
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }
  