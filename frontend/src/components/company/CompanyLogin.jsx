import React, { useState, useRef } from 'react';
import { Eye, EyeOff, ArrowRight, Building2, Mail, Briefcase, Key, Lock, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState('token');
  const navigate = useNavigate();
  
  const tokenRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (loginMethod === 'token') {
        const token = tokenRef.current.value;
        const storedToken = localStorage.getItem('companyToken');
        const storedData = JSON.parse(localStorage.getItem('companyData') || '{}');

        if (token === storedToken) {
          navigate('/company/hero');
        } else {
          alert('Invalid company token. Please try again.');
        }
      } else {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const storedData = JSON.parse(localStorage.getItem('companyData') || '{}');
        
        if (storedData.email === email && storedData.password === password) {
          localStorage.setItem('companyToken', storedData.token);
          navigate('/company/hero');
        } else {
          alert('Invalid email or password.');
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ icon: Icon, type, placeholder, inputRef }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        ref={inputRef}
        type={type}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        placeholder={placeholder}
        disabled={loading}
        required
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
          <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
          <p className="mt-2 text-center text-blue-100">Login to your company dashboard</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setLoginMethod('token')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                loginMethod === 'token'
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login with Token
            </button>
            <button
              onClick={() => setLoginMethod('credentials')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                loginMethod === 'credentials'
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login with Email
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {loginMethod === 'token' ? (
              <InputField
                icon={Building2}
                type="text"
                placeholder="Enter your company token"
                inputRef={tokenRef}
              />
            ) : (
              <>
                <InputField
                  icon={Building2}
                  type="email"
                  placeholder="Email address"
                  inputRef={emailRef}
                />
                <InputField
                  icon={Key}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  inputRef={passwordRef}
                />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center">
                  Loading...
                </span>
              ) : (
                <span className="flex items-center">
                  Login <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              )}
            </button>
            
            {/* Registration Link */}
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/company/register"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                >
                  Register here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
