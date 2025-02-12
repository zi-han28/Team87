// Homepage - Next.js with TailwindCSS
"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { user: 'User1', text: 'Hello!' },
    { user: 'User2', text: 'Hi there!' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [posts, setPosts] = useState([
    { id: 1, title: "What is Newton's law?", text: "Newton's laws of motion are three fundamental principles...", liked: false, likes: 100, comments: [] },
    { id: 2, title: "What is Law of Demand?", text: "The Law of Demand describes the relationship between price...", liked: false, likes: 100, comments: [] },
    { id: 3, title: "What components make up a phone?", text: "A phone consists of multiple components...", liked: false, likes: 100, comments: [] }
  ]);

  const toggleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
    ));
  };

  const addComment = (postId) => {
    const comment = prompt('Enter your comment:');
    if (comment && comment.trim()) {
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
      ));
    }
  };

  const sharePost = (postId) => {
    console.log(`Post ${postId} shared!`);
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages(prevMessages => [...prevMessages, { user: 'You', text: newMessage }]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>

      {/* Database Section */}
      <div className="w-4/5 mt-8">
        <h2 className="text-2xl font-bold">Database</h2>
        <div className="mt-4 space-y-4">
          {posts.map(post => (
            <div key={post.id} className="p-4 border border-gray-400 rounded-lg bg-gray-900">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm">{post.text}</p>
              <div className="flex space-x-2 mt-2">
                <button className={`px-4 py-2 rounded-lg text-white ${post.liked ? 'bg-red-500' : 'bg-blue-500'}`} onClick={() => toggleLike(post.id)}>
                  {post.liked ? 'Unlike 👎' : 'Like 👍'} ({post.likes})
                </button>
                <button className="bg-yellow-500 px-4 py-2 rounded-lg text-white" onClick={() => addComment(post.id)}>💬 Comment ({post.comments.length})</button>
                <button className="bg-gray-600 px-4 py-2 rounded-lg text-white" onClick={() => sharePost(post.id)}>🔗 Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
