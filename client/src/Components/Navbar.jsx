import React, { useState, useEffect } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSearchVisible(false); // FaBars bosilganda search input yashiriladi
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
    setIsMobileMenuOpen(false); // Search ochilganda mobile menu yopiladi
  };
	
	const handleLogout = () => {
    localStorage.removeItem('token'); // Tokenni o'chirish
    setIsLoggedIn(false);
    window.location.reload(); // Sahifani yangilash
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    document.body.className = savedMode ? 'dark' : '';

    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : '';
  }, [isDarkMode]);

  return (
    <nav className={`bg-${isDarkMode ? 'gray-900' : 'white'} border-gray-200 dark:bg-gray-900 ${isDarkMode ? 'border-b-2 border-white' : ''}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className={`text-white self-center text-2xl font-semibold whitespace-nowrap`}>
          Axidel
        </span>

        {/* Search icon in mobile size */}
        <div className="flex-1 flex items-center justify-end md:hidden">
          <button
            type="button"
            aria-controls="navbar-search"
            aria-expanded={isSearchVisible}
            onClick={toggleSearchVisibility}
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          >
            <FaSearch className="w-5 h-5" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </button>

					{/**Theme button */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="relative  items-center p-2 ml-2 mr-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Toggle Dark Mode</span>
            {isDarkMode ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m4.22 1.22l.78-.78M21 12h-1m-4.22 4.22l-.78.78M12 21v-1m-4.22-1.22l-.78-.78M3 12H2m4.22-4.22l-.78-.78M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.647 3.647 9 9 0 1020.354 15.354z"
                />
              </svg>
            )}
          </button>
					
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <FaBars className="w-5 h-5" aria-hidden="true" />
          </button>
					
        </div>

        {/* Search input in mobile size */}
        {isSearchVisible && (
          <div className="relative md:hidden w-full mt-4">
            <input
              type="text"
              id="mobile-search-navbar"
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
        )}

        {/* ul elements in desktop and mobile size */}
        <div
          id="navbar-search"
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? '' : 'hidden'}`}
        >
					<nav>
					<ul className={`flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ${isSearchVisible ? 'hidden' : ''}`}>
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 ${isDarkMode ? 'text-white' : 'text-gray-900'} bg-${isDarkMode ? 'blue-700' : 'white'} rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/mycollection"
                className={`block py-2 px-3 ${isDarkMode ? 'text-white' : 'text-gray-900'} rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                My Collections
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className={`block py-2 px-3 ${isDarkMode ? 'text-white' : 'text-gray-900'} rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                Services
              </Link>
            </li>
						{/* Log In/Log Out button for mobile */}
            <li className="block md:hidden">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className={`block py-2 px-3 ${isDarkMode ? 'text-white' : 'text-gray-900'} rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  Log Out
                </button>
              ) : (
                <a
                  href="/SignIn"
                  className={`block py-2 px-3 ${isDarkMode ? 'text-white' : 'text-gray-900'} rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  Log In
                </a>
              )}
            </li>
          </ul>
					</nav>
          
        </div>

        {/* Search input, Theme button, Log In button */}
        <div className='flex md:order-2'>
          {/* Search input in desktop size */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              <span className="sr-only">Search icon</span>
            </div>

            <input
              type="text"
              id="search-navbar"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>

          {/* Theme button in desktop size */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="relative hidden md:block items-center p-2 ml-5 -mr-5 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Toggle Dark Mode</span>
            {isDarkMode ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m4.22 1.22l.78-.78M21 12h-1m-4.22 4.22l-.78.78M12 21v-1m-4.22-1.22l-.78-.78M3 12H2m4.22-4.22l-.78-.78M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.647 3.647 9 9 0 1020.354 15.354z"
                />
              </svg>
            )}
          </button>

          {/* Log In button */}
          <ul className="hidden md:block md:order-2 w-full pt-2 ps-10 text-sm">
            <li>
							{isLoggedIn ? (
								<a href="/signin"  onClick={handleLogout} className="text-[15px] text-white bg-blue-500 hover:bg-blue-600 rounded-lg p-[10px]">
								Log out
								</a>
								) : 
								(<a href="/signin" className="text-[15px] text-white bg-blue-500 hover:bg-blue-600 rounded-lg p-[10px]">
								Log In
								</a>
								)}

              {/*<a href="/signin" className="text-[15px] text-white bg-blue-500 hover:bg-blue-600 rounded-lg p-[10px]">
                Log In
						</a>*/}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
