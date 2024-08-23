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
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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

  // Search funksiyasi
  const handleSearch = async () => {
    if (searchTerm.trim() === '') return; // Agar qidirish termi bo'sh bo'lsa hech narsa qilmang

    try {
      // Qidiruv natijalarini olish
      const response = await axios.get(`/api/search/items?searchTerm=${searchTerm}`);
      setSearchResults(response.data); // Natijalarni holatga saqlash
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <nav className='bg-gray-800 px-4 py-3 flex justify-between'>
      <div className='flex items-center text-xl'>
        <FaBars className='text-white me-4 cursor-pointer' onClick={() => setSidebarToggle(!sidebarToggle)} />
        <span className='text-white font-semibold'>Axidel</span>
      </div>

      <div className='flex items-center gap-x-5'>
        <div className='relative md:w-65'>
          <span className='relative md:absolute inset-y-0 left-0 flex items-center pl-2'>
            <button
              className='p-1 focus:outline-none text-white md:text-black'
              onClick={handleSearch} // Qidiruv tugmasi bosilganda
            >
              <FaSearch />
            </button>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block'
            placeholder='Search...'
          />
        </div>

        <div className='relative'>
          <button
            className='text-white focus:outline-none'
            onClick={toggleDropdown} // Click hodisasi
          >
            <FaUserCircle className='w-6 h-6 mt-1' />
          </button>
          {/* Dropdown menyu ko'rsatish */}
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

      {/* Qidiruv natijalari */}
      {searchResults.length > 0 && (
        <div className='absolute bg-white rounded-lg shadow w-64 top-full right-0 mt-2'>
          <ul className='py-2 text-sm text-gray-950'>
            {searchResults.map(item => (
              <li key={item.id} className='border-b last:border-b-0'>
                <a href={`/items/${item.id}`} className='block px-4 py-2 hover:bg-gray-200'>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
