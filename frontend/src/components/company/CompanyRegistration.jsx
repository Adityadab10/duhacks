import React, { useRef, useState } from 'react';
import { Eye, EyeOff, ArrowRight, Building2, Mail, Briefcase, Lock, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTokenPopup, setShowTokenPopup] = useState(false);
  const [generatedToken, setGeneratedToken] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const companyNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const industryRef = useRef();
  const websiteRef = useRef();
  const agreeToTermsRef = useRef();

  const generateCompanyToken = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    const companyHash = companyNameRef.current.value.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0).toString(36);
    return `${timestamp}-${randomStr}-${companyHash}`;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!companyNameRef.current.value.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!emailRef.current.value.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(emailRef.current.value)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!passwordRef.current.value) {
      newErrors.password = 'Password is required';
    } else if (passwordRef.current.value.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!industryRef.current.value.trim()) {
      newErrors.industry = 'Industry is required';
    }

    if (!agreeToTermsRef.current.checked) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const token = generateCompanyToken();
      setGeneratedToken(token);

      const formData = {
        companyName: companyNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        industry: industryRef.current.value,
        website: websiteRef.current.value || undefined,
        token: token
      };

      const response = await fetch("http://localhost:4000/api/company/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("userData", JSON.stringify({
        ...data.company,
        token: token
      }));

      // Show token popup
      setShowTokenPopup(true);

    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: error.message || "Registration failed. Please try again." });
      setShowTokenPopup(false); // Make sure popup is hidden on error
    } finally {
      setLoading(false);
    }
  };

  const renderError = (fieldName) => {
    return errors[fieldName] ? (
      <p className="mt-1 text-sm text-red-600">{errors[fieldName]}</p>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
          <h2 className="text-3xl font-bold text-center">Welcome to DuHacks</h2>
          <p className="mt-2 text-center text-blue-100">Register your company and start hiring talent</p>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  ref={companyNameRef}
                  type="text"
                  className={`pl-10 block w-full h-11 rounded-lg border ${
                    errors.companyName ? 'border-red-300' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white`}
                  placeholder="Enter company name"
                />
              </div>
              {renderError('companyName')}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  ref={emailRef}
                  type="email"
                  className={`pl-10 block w-full h-11 rounded-lg border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white`}
                  placeholder="Enter email address"
                />
              </div>
              {renderError('email')}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  className={`pl-10 pr-10 block w-full h-11 rounded-lg border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              {renderError('password')}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  ref={confirmPasswordRef}
                  type={showPassword ? "text" : "password"}
                  className={`pl-10 block w-full h-11 rounded-lg border ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white`}
                  placeholder="Confirm password"
                />
              </div>
              {renderError('confirmPassword')}
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Industry
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  ref={industryRef}
                  rows="3"
                  className={`pl-10 block w-full rounded-lg border ${
                    errors.industry ? 'border-red-300' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white resize-none`}
                  placeholder="Describe your industry"
                />
              </div>
              {renderError('industry')}
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  ref={websiteRef}
                  type="url"
                  className="pl-10 block w-full h-11 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                  placeholder="Company website"
                />
              </div>
            </div>

            {/* Agree to Terms */}
            <div className="flex items-center">
              <input
                ref={agreeToTermsRef}
                type="checkbox"
                className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                  errors.agreeToTerms ? 'border-red-300' : ''
                }`}
              />
              <label className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-blue-600 hover:text-blue-500">Terms and Conditions</a>
              </label>
            </div>
            {renderError('agreeToTerms')}
            {renderError('submit')}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  Register Company
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
            
            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate('/company/login')}
                  className="font-medium text-blue-600 hover:text-blue-500"
                  disabled={loading}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Token Popup */}
      {showTokenPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Registration Successful!</h3>
            <p className="text-gray-600 mb-4">
              Please save your token number. You will need it for future logins:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-6 break-all">
              <p className="font-mono text-blue-600 select-all">{generatedToken}</p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedToken);
                  alert('Token copied to clipboard!');
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Copy Token
              </button>
              <button
                onClick={() => {
                  setShowTokenPopup(false);
                  console.log('Navigating to dashboard...'); // Add this line
                  navigate('/company/dashboard');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyRegistration;