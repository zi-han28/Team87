"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { user: 'User1', text: 'Hello!' },
    { user: 'User2', text: 'Hi there!' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  // ✅ Fetch homepage-relevant data (not full posts)
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/home")  // Fetch only homepage data
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching homepage data:", error));
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen text-white p-6">
      {/* Chat Section */}
      <div className="w-4/5 bg-gray-900 p-6 shadow-lg rounded-lg flex flex-col h-96">
        <h2 className="text-2xl font-bold mb-4">Chat Room</h2>
        <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-800 rounded-lg">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded-lg max-w-xs ${msg.user === 'You' ? 'bg-green-400 self-end ml-auto' : 'bg-blue-400'}`}> 
              <strong>{msg.user}: </strong>{msg.text}
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="text"
            className="flex-grow p-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={() => setMessages([...messages, { user: "You", text: newMessage }])}
          >
            Send
          </button>
        </div>
      </div>

      {/* Database Section */}
      <div className="w-4/5 mt-8">
        <h2 className="text-2xl font-bold">Latest Posts</h2>
        <div className="mt-4 space-y-4">
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} className="p-4 border border-gray-400 rounded-lg bg-gray-900">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm">{post.text}</p>
                <div className="flex space-x-2 mt-2">
                  <button className="bg-blue-500 px-4 py-2 rounded-lg text-white">
                    View More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Loading homepage posts...</p>
          )}
        </div>
      </div>
    </div>
  );
}
