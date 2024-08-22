import React, { useState, useEffect, useRef } from 'react';
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
          {/* Dropdown menyu ko'rsatish */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef} // Dropdownni referensiyasini qo'shish
              className='z-10 absolute bg-white rounded-lg shadow w-32 top-full right-0'
            >
              <ul className='py-2 text-sm text-gray-950'>
                <li><a href="#" className='block px-4 py-2 hover:bg-gray-200'>Profile</a></li>
                <li><a href="#" className='block px-4 py-2 hover:bg-gray-200'>Settings</a></li>
                <li><a href="#" className='block px-4 py-2 hover:bg-gray-200'>Log out</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
