// Homepage(/)
"use client";
import Link from 'next/link';
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
    <div className="home-container">
      {/* Homepage Section */}
      <div className="homepage">
        <h1>Homepage</h1>
        <ul className="nav-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </ul>
      </div>

      {/* Chat Section */}
      <div className="chat-container">
        <h2 className="chat-room">Chat Room</h2>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.user === 'You' ? 'user' : 'other'}`}>
              <strong>{msg.user}: </strong>{msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="chat-send-btn" onClick={handleSend}>Send</button>
        </div>
      </div>

      {/* Database Section */}
      <div className="database-container">
        <h2 className="database-title">Database</h2>
        <div>
          {posts.map(post => (
            <div key={post.id} className="post">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-text">{post.text}</p>
              <div className="post-actions">
                <button className={`like-btn ${post.liked ? 'liked' : 'unliked'}`} onClick={() => toggleLike(post.id)}>
                  {post.liked ? 'Unlike 👎' : 'Like 👍'} ({post.likes})
                </button>
                <button className="comment-btn" onClick={() => addComment(post.id)}>💬 Comment ({post.comments.length})</button>
                <button className="share-btn" onClick={() => sharePost(post.id)}>🔗 Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

