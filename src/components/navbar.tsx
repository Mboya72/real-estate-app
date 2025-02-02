'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Track if the user is logged in by checking sessionStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there's a user in sessionStorage on component mount
    if (typeof window !== 'undefined' && sessionStorage.getItem("user")) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("user");  // Remove the user from sessionStorage
    setIsLoggedIn(false);  // Update the login state
  };

  return (
    <nav className="p-4">
      <div className="max-w-[95vw] mx-auto flex justify-between items-center">
        {/* Left side - Website name */}
        <div className="text-white text-3xl font-bold">
          <Link href="/">Sheltor</Link>
        </div>

        {/* Center - Navigation links */}
        <div className="flex-1 hidden md:flex justify-center space-x-8">
          <Link href="/" className="relative text-white font-normal text-xl group">
            Home
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-lightPink group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/about" className="relative text-white font-normal text-xl group">
            About
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-lightPink group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/rent" className="relative text-white font-normal text-xl group">
            Rent
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-lightPink group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/buy" className="relative text-white font-normal text-xl group">
            Buy
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-lightPink group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/postbuy" className="relative text-white font-normal text-xl group">
            Sell a House
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-lightPink group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/postrent" className="relative text-white font-normal text-xl group">
            Rent a House
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-lightPink group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/contact" className="relative text-white font-normal text-xl group">
            Contact Us
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-lightPink group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Right side - Login/Logout */}
        <div className="flex space-x-4">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="text-white hover:bg-[#6E4559] py-2 px-4 border border-white transition duration-300">
                Login
              </Link>
              <Link href="/signup" className="text-white hover:bg-[#6E4559] py-2 px-4 border border-white transition duration-300">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white hover:bg-[#6E4559] py-2 px-4 border border-white transition duration-300"
            >
              Logout
            </button>
          )}
        </div>

        {/* Hamburger Menu (visible on mobile) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (positioned absolutely above content) */}
      {menuOpen && (
        <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-75 z-20 flex flex-col items-center space-y-4 mt-4">
          {/* Close button (X) */}
          <button onClick={closeMenu} className="absolute top-4 right-4 text-white text-3xl font-bold">
            &times; {/* This is the "X" character */}
          </button>

          {/* Menu Links */}
          <Link href="/" className="text-white hover:text-gray-400" onClick={closeMenu}>Home</Link>
          <Link href="/about" className="text-white hover:text-gray-400" onClick={closeMenu}>About</Link>
          <Link href="/rent" className="text-white hover:text-gray-400" onClick={closeMenu}>Rent</Link>
          <Link href="/buy" className="text-white hover:text-gray-400" onClick={closeMenu}>Buy</Link>
          <Link href="/contact" className="text-white hover:text-gray-400" onClick={closeMenu}>Contact Us</Link>
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="text-white hover:text-gray-400" onClick={closeMenu}>Login</Link>
              <Link href="/signup" className="text-white hover:text-gray-400" onClick={closeMenu}>Signup</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-white hover:text-gray-400" onClick={closeMenu}>Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
