import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Mail, User, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FreelancerRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const  navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    title: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleGoogleSignIn = () => {
    console.log('Google sign-in initiated');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Professional title is required';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-12 py-8 text-white">
            <h1 className="text-4xl font-bold mb-3">Join Our Community</h1>
            <p className="text-xl text-blue-50">Start your freelancing journey today</p>
          </div>

          {/* Form Section */}
          <div className="p-12">
            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-white border border-gray-300 text-gray-700 py-4 px-6 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors text-lg font-medium mb-8 shadow-sm"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={formData.fullName} 
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} 
                    className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-gray-50 focus:bg-white transition-colors ${errors.fullName ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-blue-500`}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-2">{errors.fullName}</p>}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-gray-50 focus:bg-white transition-colors ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-blue-500`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                    className={`w-full pr-12 pl-4 py-4 border rounded-xl bg-gray-50 focus:bg-white transition-colors ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-blue-500`}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                </div>

                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password" 
                    value={formData.confirmPassword} 
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
                    className={`w-full px-4 py-4 border rounded-xl bg-gray-50 focus:bg-white transition-colors ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-blue-500`}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>}
                </div>

                <div className="relative md:col-span-2">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Professional Title" 
                    value={formData.title} 
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                    className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-gray-50 focus:bg-white transition-colors ${errors.title ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-blue-500`}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="pt-4">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={formData.agreeToTerms} 
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })} 
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-base text-gray-600">
                    I agree to the <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Terms and Conditions</a>
                  </span>
                </label>
                {errors.agreeToTerms && <p className="text-red-500 text-sm mt-2">{errors.agreeToTerms}</p>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-3 hover:bg-blue-700 transition-colors text-lg font-semibold mt-8"
              >
                <span>Create Account</span>
                <ArrowRight size={24} />
              </button>
            </form>

            {/* Sign In Link */}
            <p className="text-center mt-8 text-gray-600 text-lg">
              Already have an account? 
                <div onClick={navigate('login')}>
                    Sign in
                </div>
                            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerRegistration;
