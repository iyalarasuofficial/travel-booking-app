import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../service/ApiService'; // Import your api instance
import ApiRoutes from '../../../utils/ApiRoutes'; // Import your ApiRoutes
import toast from 'react-hot-toast';
import logo from "../../../assets/photos/logo.png"


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sending a POST request to the forgot-password API route
      const response = await api.post(ApiRoutes.FORGOT_PASSWORD.path, { email }, {
        authenticate: ApiRoutes.FORGOT_PASSWORD.authenticate,
      });

      // Displaying success message
      toast.success(response.data.message);

      // Redirect to the login page after a successful reset request
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      // Show error message if any error occurs
      toast.error(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="flex flex-col w-96 items-center justify-center px-6 pb-12 mx-auto md:h-screen lg:py-0 sm:max-w-md">
      <a href="#" className="flex items-center text-2xl font-semibold text-gray-900 mb-6">
          <img
            className="w-36 h-30"
            src={ logo}// Replace with the correct path to your logo
            alt="Logo"
          />
        </a>
        
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 sm:min-w-96 lg:mb-9">
          
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Forgot your password?
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291A7.962 7.962 0 014 12H0c0 2.137.84 4.077 2.207 5.457l1.793-1.166z"
                    ></path>
                  </svg>
                ) : (
                  'Reset Password'
                )}
              </button>
              <p className="text-sm font-light text-gray-500">
                Remember your password?{' '}
                <a
                  href="/"
                  className="font-medium text-pink-600 hover:underline"
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
