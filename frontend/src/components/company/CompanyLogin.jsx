import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Loader, Building2, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyLogin = () => {
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState('token'); // 'token' or 'credentials'
  const [formData, setFormData] = useState({
    token: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (loginMethod === 'token') {
        // Get stored company data
        const storedToken = localStorage.getItem('companyToken');
        const storedData = JSON.parse(localStorage.getItem('companyData') || '{}');

        if (formData.token === storedToken) {
          // Token matches, proceed with login
          navigate('/company/hero');
        } else {
          alert('Invalid company token. Please try again.');
        }
      } else {
        // Handle credential-based login
        const storedData = JSON.parse(localStorage.getItem('companyData') || '{}');
        if (storedData.email === formData.email && storedData.password === formData.password) {
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

  const InputField = ({ icon: Icon, type, placeholder, value, onChange }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={type}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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
          {/* Login Method Toggle */}
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
                icon={Key}
                type="text"
                placeholder="Enter Company Token"
                value={formData.token}
                onChange={(e) => setFormData({ ...formData, token: e.target.value })}
              />
            ) : (
              <>
                <InputField
                  icon={Building2}
                  type="email"
                  placeholder="Company Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={loading}
                    required
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <Loader className="animate-spin h-5 w-5" />
              ) : (
                <>
                  Login
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/company/register')}
                className="font-medium text-blue-600 hover:text-blue-500"
                disabled={loading}
              >
                Register your company
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
