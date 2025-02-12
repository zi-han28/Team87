// src/components/navbar.js
"use client";
import Link from 'next/link';
import { useState } from "react";

export default function Navbar() {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className="bg-white border-2 border-gray-300 dark:bg-gray-900 dark:border-gray-700 shadow-md">
      <div className="bg-red-500 text-white p-4">If you see this, Tailwind is working</div>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>

        {/* Right Side Buttons */}
        <div className="flex items-center md:order-2 space-x-3">
          {/* User Dropdown Button */}
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {/* <span className="sr-only">Open user menu</span> */}
            <span className="text-white px-4 py-2">Log in/Sign up</span>
          </button>

          {/* Mobile Menu Button */}
          {/* <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button> */}
        </div>

        {/* Navbar Links */}
        <div className="flex w-full justify-center md:justify-end">
          <ul className="flex flex-row gap-x-8 list-none">
            {/* <li><Link href="/" className="block py-2 px-3 text-white bg-blue-700 rounded-md md:bg-transparent md:text-blue-700">Home</Link></li>
            <li><a href="#" className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white">About</a></li>
            <li><a href="#" className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white">Services</a></li>
            <li><a href="#" className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white">Pricing</a></li>
            <li><a href="#" className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white">Contact</a></li> */}

            <li className="inline-block"><a href="#">Home</a></li>
            <li className="inline-block"><a href="#">About</a></li>
            <li className="inline-block"><a href="#">Services</a></li>
            <li className="inline-block"><a href="#">Contact</a></li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
