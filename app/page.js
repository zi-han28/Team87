"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [messages, setMessages] = useState([
    { user: 'User1', text: 'Hello!' },
    { user: 'User2', text: 'Hi there!' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [viewingCommentsForPost, setViewingCommentsForPost] = useState(null);

  // Default posts
  const defaultPosts = [
    { id: 1, title: "What is Newton's law?", text: "Newton's laws of motion are three fundamental principles...", liked: false, likes: 100, comments: [
      "Great explanation!",
      "I learned a lot from this post.",
      "Can you provide more examples?"
    ], bookmarked: false },
    { id: 2, title: "What is Law of Demand?", text: "The Law of Demand describes the relationship between price...", liked: false, likes: 100, comments: ["Which component is the most important?"], bookmarked: false },
    { id: 3, title: "What components make up a phone?", text: "A phone consists of multiple components...", liked: false, likes: 100, comments: ["This is a very timely topic.",
      "How did the pandemic affect the global economy?"], bookmarked: false },
    { id: 4, title: "Which countries were most affected by COVID?", text: "Many countries were...", liked: false, likes: 169, comments: [], bookmarked: false }
  ];

  // Load bookmarked state from localStorage and merge with default posts
  const [posts, setPosts] = useState(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
    const likedPosts = JSON.parse(localStorage.getItem('liked')) || {};
    return defaultPosts.map(post => ({
      ...post,
      bookmarked: savedBookmarks[post.id] || false, // Use saved bookmarked state or default to false,
      liked: likedPosts[post.id] || false // Use saved bookmarked state or default to false
    }));
  });

//   const [posts, setPosts] = useState(() => {
//   if (typeof window !== "undefined") {
//     const savedPosts = JSON.parse(localStorage.getItem('posts')) || defaultPosts;
//     return savedPosts;
//   }
//   return defaultPosts;
// });

  // Save bookmarked state to localStorage
  const saveBookmarks = (posts) => {
    const bookmarks = posts.reduce((acc, post) => {
      acc[post.id] = post.bookmarked;
      return acc;
    }, {});
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }; 

  const toggleBookmark = (postId) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
    );
    setPosts(updatedPosts);
    saveBookmarks(updatedPosts); // Save bookmarked state to localStorage
  };

  const saveLikes = (posts) => {
    const liked = posts.reduce((acc, post) => {
      acc[post.id] = post.liked;
      return acc;
    }, {});
    localStorage.setItem('liked', JSON.stringify(liked));
  }; 

  const toggleLike = (postId) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
    );
    setPosts(updatedPosts);
    saveLikes(updatedPosts);

    // Dispatch a custom event to notify other pages (e.g., History page)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event('likedStateChanged'));
    }
  };

  const addComment = (postId) => {
    const comment = prompt('Enter your comment:');
    if (comment && comment.trim()) {
      const updatedPosts = posts.map(post => 
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
      );
      setPosts(updatedPosts);
    }
  };

  const viewComments = (postId) => {
    if (viewingCommentsForPost === postId) {
      // If the comments for this post are already being viewed, hide them
      setViewingCommentsForPost(null);
    } else {
      // Otherwise, show the comments for this post
      setViewingCommentsForPost(postId);
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
                <button
                  className={`px-4 py-2 rounded-lg text-white ${post.liked ? 'bg-red-500' : 'bg-blue-500'}`}
                  onClick={() => toggleLike(post.id)}
                >
                  {post.liked ? 'Unlike 👎' : 'Like 👍'} ({post.likes})
                </button>
                <button
                  className="bg-yellow-500 px-4 py-2 rounded-lg text-white"
                  onClick={() => addComment(post.id)}
                >
                  💬 Comment
                </button>
                <button
                  className="bg-green-500 px-4 py-2 rounded-lg text-white"
                  onClick={() => viewComments(post.id)}
                >
                  💬 View Comments ({post.comments.length})
                </button>
                <button
                  className="bg-gray-600 px-4 py-2 rounded-lg text-white"
                  onClick={() => sharePost(post.id)}
                >
                  🔗 Share
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-white ${post.bookmarked ? 'bg-purple-500' : 'bg-gray-500'}`}
                  onClick={() => toggleBookmark(post.id)}
                >
                  {post.bookmarked ? 'Unbookmark ❌' : 'Bookmark 📌'}
                </button>
              </div>

              {viewingCommentsForPost === post.id && (
                <div className="mt-4">
                  <h4 className="font-semibold">Comments:</h4>
                  {post.comments.length > 0 ? (
                    post.comments.map((comment, index) => (
                      <div key={index} className="p-2 bg-gray-800 rounded-lg mt-2">
                        <p className="text-sm">{comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No comments yet.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Link to Bookmarked Posts */}
      <div className="w-4/5 mt-8">
        <Link href="/bookmark" className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
          View Bookmarked Posts
        </Link>
      </div>

      {/* Link to Liked Posts History */}
      <div className="w-4/5 mt-8">
        <Link href="/history" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          View Liked Posts History
        </Link>
      </div>
    </div>
  );
}