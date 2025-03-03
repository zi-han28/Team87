// src/components/navbar.js
"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link"; // Next.js Link component
import { useUser } from './UserContext';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const {user, setUser} = useUser();

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await fetch('/api/navbar', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });
        // when user is logged in
        if (response.ok) {
          const data = await response.json();
          setUser({
            isLoggedIn: true,
            user_username: data.user_username,
            user_email: data.user_email,
        });
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };
    fetchUserImage();
  }, [setUser]);

    //sign out
    const handleSignOut = async () => {
      try {
        const response = await fetch('/api/navbar', {
          method: 'POST',
          credentials: 'include', // Include cookies in the request
        });
  
        if (response.ok) {
          // Update global state to reflect that the user is logged out
          setUser({
            isLoggedIn: false,
            user_username: null,
            user_email: null,
          });
          window.location.href = "/login"; // Redirect to home page
        } else {
          console.error('Failed to sign out');
        }
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3">
          <img src="/globe.svg" className="h-8" alt="StudySharp" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            StudySharp
          </span>
        </a>

        {/* Right Side Buttons */}
        <div className="flex items-center md:order-2 space-x-3">
          {/* User Dropdown Button */}
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className="sr-only">Open user menu</span>
            {user.isLoggedIn ? (
              // Display profile image if logged in
              <div className="w-10 h-10 absolute top-[25px] right-[150px] rounded-full bg-[#613DC1] flex items-center justify-center text-white text-xl">
                {user.user_username ? user.user_username[0].toUpperCase() : "?"}
              </div>
              ) : (// Display default login/signup button
              <Link href="/login" className="text-white px-4 py-2">Login/Sign up</Link>
            )}
          </button>

          {/*Dropdown Menu */}
          {isDropdownOpen && user.isLoggedIn && (
            <div className="absolute right-[0px] top-[60px] mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
              <div className="px-4 py-3">
                <span className="block text-sm">{user.user_username}</span>
                <span className="block text-sm">{user.user_email}</span>
              </div>
              <ul className="py-2">
              <li><Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200">Profile</Link></li>
                <li><a onClick={handleSignOut} className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200">sign out</a></li>
              </ul>
            </div>
          )}

          {/* Dropdown Menu Button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>

        {/* Navbar Links */}
        <div className={`items-center ${isNavOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}>
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 space-x-12 md:flex-row">
            <li><Link href="/"  className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white">Home</Link></li>
            <li><Link href="/chatrooms" className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white">chatrooms</Link></li>
            <li><Link href="/postingarea" className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white">Post</Link></li>
            <li><Link href="/bookmark" className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white">Bookmark</Link></li>
            <li><Link href="/history" className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white">Likes</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
