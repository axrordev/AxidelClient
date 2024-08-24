/*import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaSearch, FaUserCircle } from 'react-icons/fa';

const Navbar = ({sidebarToggle, setSidebarToggle}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Dropdownni referensiyasini saqlash

  // Dropdownni ochish va yopish uchun handler
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Klik orqali dropdownni yopish uchun handler
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className='bg-gray-800 px-4 py-3 flex justify-between '>
      <div className='flex items-center text-xl'>
        <FaBars className='text-white me-4 cursor-pointer' onClick={() => setSidebarToggle(!sidebarToggle)}/>
        <span className='text-white font-semibold'>Axidel</span>
      </div>

      <div className='flex items-center gap-x-5'>
        <div className='relative md:w-65'>
          <span className='relative md:absolute inset-y-0 left-0 flex items-center pl-2'>
            <button className='p-1 focus:outline-none text-white md:text-black'>
              <FaSearch/>
            </button>
          </span>
          <input
            type="text"
            className='w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block'
          />
        </div>

        <div className='relative'>
          <button 
            className='text-white focus:outline-none'
            onClick={toggleDropdown} // Click hodisasi
          >
            <FaUserCircle className='w-6 h-6 mt-1'/>
          </button>
          
          {isDropdownOpen && (
            <div
              ref={dropdownRef} // Dropdownni referensiyasini qo'shish
              className='z-10 absolute bg-white rounded-lg shadow w-32 top-full right-0'
            >
              <ul className='py-2 text-sm text-gray-950'>
  <li><a href="/profile" className='block px-4 py-2 hover:bg-gray-200'>Profile</a></li>
  <li><a href="/settings" className='block px-4 py-2 hover:bg-gray-200'>Settings</a></li>
  <li><a href="/logout" className='block px-4 py-2 hover:bg-gray-200'>Log out</a></li>
</ul>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
*/
import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaSearch, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const dropdownRef = useRef(null);
  const resultsRef = useRef(null);

  // Dropdown toggle handler
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (resultsRef.current && !resultsRef.current.contains(event.target)) {
      setResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle search button click or enter key press
  const handleSearch = async () => {
    if (query.trim() !== '') {
      try {
        const response = await axios.get(`https://axidel-ezhzgse9eyacc6e9.eastasia-01.azurewebsites.net/search?query=${encodeURIComponent(query)}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
};


  // Handle enter key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="bg-gray-800 px-4 py-3 flex justify-between">
      <div className="flex items-center text-xl">
        <FaBars className="text-white me-4 cursor-pointer" onClick={() => setSidebarToggle(!sidebarToggle)} />
        <span className="text-white font-semibold">Axidel</span>
      </div>

      <div className="flex items-center gap-x-5">
        <div className="relative md:w-65">
          <span className="relative md:absolute inset-y-0 left-0 flex items-center pl-2">
            <button className="p-1 focus:outline-none text-white md:text-black" onClick={handleSearch}>
              <FaSearch />
            </button>
          </span>
          <input
            type="text"
            className="w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for items or collections..."
          />
          {/* Search Results */}
          {results.length > 0 && (
            <div ref={resultsRef} className="absolute bg-white w-full rounded-lg shadow top-full left-0 mt-2 z-20">
              <ul className="py-2 text-sm text-gray-950">
                {results.map((result) => (
                  <li key={result.id}>
                    <a href={result.url} className="block px-4 py-2 hover:bg-gray-200">
                      {result.ResultType === 'Item' ? result.ItemName : result.CollectionName}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative">
          <button className="text-white focus:outline-none" onClick={toggleDropdown}>
            <FaUserCircle className="w-6 h-6 mt-1" />
          </button>

          {isDropdownOpen && (
            <div ref={dropdownRef} className="z-10 absolute bg-white rounded-lg shadow w-32 top-full right-0">
              <ul className="py-2 text-sm text-gray-950">
                <li><a href="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</a></li>
                <li><a href="/settings" className="block px-4 py-2 hover:bg-gray-200">Settings</a></li>
                <li><a href="/logout" className="block px-4 py-2 hover:bg-gray-200">Log out</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
