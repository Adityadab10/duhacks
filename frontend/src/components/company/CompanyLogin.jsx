import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Company Login Attempt:', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EEEB]">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#2F4156] mb-2">Welcome Back, Employer</h1>
            <p className="text-[#567C8D]">Log in to post and manage job listings</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2F4156] mb-2">
                Company Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#C8D9E6] focus:outline-none focus:border-[#567C8D] bg-white"
                placeholder="Enter your company email"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2F4156] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#C8D9E6] focus:outline-none focus:border-[#567C8D] bg-white"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#567C8D]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-[#567C8D] border-[#C8D9E6] rounded"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-[#567C8D]">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-[#567C8D] hover:text-[#2F4156]">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#2F4156] text-white py-3 px-4 rounded-lg hover:bg-[#567C8D] transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>Log In</span>
              <ArrowRight size={20} />
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-[#567C8D]">
              New to our platform?{' '}
              <button 
                onClick={() => navigate('/company/register')}
                className="text-[#2F4156] font-semibold hover:text-[#567C8D] cursor-pointer"
              >
                Create a Company Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLoginPage;
