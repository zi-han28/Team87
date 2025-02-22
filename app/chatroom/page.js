// src/components/Chatroom.jsx
'use client'; // Mark this as a Client Component

import { useState } from 'react';
import Link from 'next/link';
// Mock data for messages
const mockMessages = [
  {
    id: 1,
    sender: 'Alice',
    text: 'Hey everyone! How are you doing?',
    timestamp: '10:00 AM',
  },
  {
    id: 2,
    sender: 'Bob',
    text: 'I\'m doing great! How about you?',
    timestamp: '10:05 AM',
  },
  {
    id: 3,
    sender: 'Charlie',
    text: 'Just finished my coffee. Ready for the day!',
    timestamp: '10:10 AM',
  },
];

export default function Chatroom() {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      sender: 'You', // Simulate the current user
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="p-4">
        <h1 className="font-bold text-[#613CD1] text-center text-[60px]">Chatroom</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'You' ? 'justify-end' : 'justify-start'
            }`}
          >
            {/* Avatar */}
            {message.sender !== 'You' && (
              <div className="w-10 h-10 rounded-full bg-[#613CD1] flex items-center justify-center text-white text-lg mr-2">
                {message.sender[0]}
              </div>
            )}

            {/* Message */}
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === 'You'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <div className="text-sm font-semibold">{message.sender}</div>
              <div className="text-sm">{message.text}</div>
              <div className="text-xs text-gray-400 mt-1">{message.timestamp}</div>
            </div>

            {/* Avatar for the current user */}
            {message.sender === 'You' && (
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-lg ml-2">
                {message.sender[0]}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}