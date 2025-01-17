import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../../service/ApiService';
import logo from "../../assets/photos/logo.png";
import toast from 'react-hot-toast';
import ApiRoutes from '../../utils/ApiRoutes';
import defaultprofile from '../../assets/photos/defaultProfile.png'

const Nav = () => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
    setIsProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsNavMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(`/${path}`);
    setIsNavMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  const handleLogout = () => {
    // Clear user data from local storage or session storage
    localStorage.removeItem('userToken');  // assuming you're storing a token in localStorage
    sessionStorage.removeItem('userToken');  // if it's in sessionStorage, remove it

    // You can also reset the user state:
    setUser(null);

    // Optionally, navigate the user to the login page or homepage
    navigate('/');  // Redirect to login page or home page after logout

    // You can also show a message or alert (optional)
    toast.success('You have been logged out');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
       const response = await api.get(ApiRoutes.GET_USER_INFO_BY_ID.path);
        setUser(response.data.photo);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Tour'];

  return (
    <header className="fixed top-0 z-10 w-full bg-transparent transition-all duration-300 ">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-1 ">
           
              <img
                src={logo}
                alt="TravelSphere Logo"
                className="h-12 w-auto"
              />
         
          </div>

          {/* Hamburger Button for Small Screens */}
          <div className="md:hidden flex items-center ">
  <button
    type="button"
    className="text-black font-bold focus:outline-none mr-7"
    onClick={toggleNavMenu}
  >
    <span className="sr-only">Open menu</span>
    ☰
  </button>
</div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-10">
            <nav aria-label="Global">
              <ul className="flex items-center gap-4 text-sm mr-20 mt-3">
                {navItems.map((item) => (
                  <li key={item}>
                    <button
                      className={`${
                        location.pathname === `/${item.toLowerCase()}`
                          ? 'text-pink-500'
                          : isScrolled
                          ? 'text-gray-800'
                          : 'text-white'
                      } font-bold transition duration-300 hover:text-pink-500`}
                      onClick={() => handleNavigation(item.toLowerCase())}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Profile Button */}
          <div className="relative">
            <button
              type="button"
              className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
              onClick={toggleProfileMenu}
            >
              <span className="sr-only">Toggle profile menu</span>
              <img
                src={user  ? `${import.meta.env.VITE_BASE_URL}/${user}` : defaultprofile }
                alt="Profile"
                className="w-10 h-10 object-cover rounded-full"
              />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-lg rounded-md z-50">
                <ul className="divide-y divide-gray-200">
                  {['My Profile', 'Bookings'].map((item) => (
                    <li key={item}>
                      <button
                        className="block w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-100"
                        onClick={() =>
                          handleNavigation(item.toLowerCase().replace(' ', '_'))
                        }
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100"
                  onClick={handleLogout} // Call handleLogout on Logout button click
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isNavMenuOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col items-start gap-4 p-4">
            {navItems.map((item) => (
              <li key={item}>
                <button
                  className="text-gray-800 font-bold transition hover:text-pink-500"
                  onClick={() => handleNavigation(item.toLowerCase())}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Nav;
