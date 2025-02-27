'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Chatrooms() {
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    fetch('/api/chatrooms')
      .then((response) => response.json())
      .then((data) => setChatrooms(data))
      .catch((error) => console.error('Error fetching chatrooms:', error));
  }, []);
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl text-center text-indigo-800 font-bold mb-8">Select a Chatroom</h1>
      <div className="space-y-4">
        {chatrooms.map((chatroom) => (
          <Link
            key={chatroom.id}
            href={`/chatrooms/${chatroom.id}`} // Link to the dynamic route
            className="block p-4 rounded-lg shadow-md border border-gray-300 hover:bg-gray-200 hover:text-[#613DC1] hover:shadow-lg transition duration-300 bg-[#613DC1]">
            <h2 className="text-xl text-center font-semibold ">{chatroom.name}</h2>
            <p className="text-center pt-[10px]">{chatroom.intro}</p>
          </Link>
        ))}
      </div>
    </div>
  );
  
}