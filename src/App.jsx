// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import React from 'react';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold">MyHomePage</div>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-300">Home</a></li>
            <li><a href="#" className="hover:text-blue-300">About</a></li>
            <li><a href="#" className="hover:text-blue-300">Services</a></li>
            <li><a href="#" className="hover:text-blue-300">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-grow bg-blue-50">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Welcome to MyHomePage</h1>
          <p className="text-blue-700 mb-8">This is a simple home page built with React and Tailwind CSS.</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Get Started</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 p-4 text-white text-center">
        <p>&copy; 2023 MyHomePage. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
