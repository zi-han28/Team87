// src/components/navbar.js
"use client";
import Link from 'next/link';
import { useState } from "react";

export default function Navbar() {
  return (
    <nav className="bg-white border-2 border-gray-300 dark:bg-gray-900 dark:border-gray-700 shadow-md">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        
        {/* Left Side - Logo */}
        <a href="/" className="flex items-center space-x-3">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex flex-row gap-x-8">
            <li><Link href="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link href="/about" className="hover:text-blue-500">About</Link></li>
            <li><Link href="/services" className="hover:text-blue-500">Services</Link></li>
            <li><Link href="/contact" className="hover:text-blue-500">Contact</Link></li>
          </ul>
        </div>

        {/* Right Side - Login/Signup */}
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Log in
          </button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}
