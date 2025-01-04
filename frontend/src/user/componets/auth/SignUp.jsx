import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../service/ApiService";  // Make sure this API service is correctly implemented
import ApiRoutes from "../../../utils/ApiRoutes";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formData = new FormData(e.currentTarget);
      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
  
     
      let response = await api.post(ApiRoutes.SIGNUP.path, data, {
        headers: {
          'Content-Type': 'application/json',  
        },
      });
  
      toast.success(response.message);
      navigate("/signin");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error occurred! Please try again!"
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="flex flex-col w-96 items-center justify-center px-6 pb-12 mx-auto md:h-screen lg:py-0 sm:max-w-md">
        <a href="#" className="flex items-center text-2xl font-semibold text-gray-900">
          {/* <img className="w-36 h-30" src={logo} alt="logo" /> */}
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 sm:min-w-96 lg:mb-9">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form onSubmit={handleSignUp} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-orange-600 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291A7.962 7.962 0 014 12H0c0 2.137.84 4.077 2.207 5.457l1.793-1.166z"></path>
                  </svg>
                ) : (
                  "Sign up"
                )}
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link to="/signin" className="font-medium text-orange-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
