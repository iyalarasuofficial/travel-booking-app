import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (section) => {
    console.log(`Navigating to ${section}`);
  };

  return (
    <header className=" sticky top-0 z-1">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-10 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" to="/" onClick={() => handleNavigation('home')}>
              <span className="sr-only">Home</span>
              <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41Z" fill="currentColor" />
              </svg>
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-10 mt-3">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-3 text-sm mx-5 ">
                {['Home', 'About', 'Tour'].map((item) => (
                  <li key={item}>
                    <Link
                       className="text-white font-bold transition hover:text-gray-300 no-underline"
                      to={`/${item.toLowerCase()}`}
                      onClick={() => handleNavigation(item.toLowerCase())}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden md:relative md:block mb-2">
              <button
                type="button"
                className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
                onClick={toggleMenu}
              >
                <span className="sr-only">Toggle dashboard menu</span>
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Profile"
                  className="w-8 h-8 object-cover rounded-full"
                />
              </button>

              {isMenuOpen && (
                <div className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg">
                  <div className="p-2">
                    {['My profile', 'Billing summary', 'Team settings'].map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                        onClick={() => handleNavigation(item.toLowerCase().replace(' ', '_'))}
                      >
                        {item}
                      </a>
                    ))}
                  </div>

                  <div className="p-2">
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                      role="menuitem"
                      onClick={() => console.log('Logged out')}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="block md:hidden">
              <button
                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                onClick={toggleMenu}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
