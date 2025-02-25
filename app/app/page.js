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

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState(new Set()); // Track liked posts
  const [savedPosts, setSavedPosts] = useState(new Set()); // Track saved posts

  // Fetch all posts and liked posts for the current user
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all posts
        const postsResponse = await fetch("/api/home");
        if (!postsResponse.ok) {
          throw new Error("Failed to fetch posts");
        }
        const postsData = await postsResponse.json();
        setPosts(postsData);

        // Fetch liked posts for the current user
        const user_username = "testuser"; // Replace with the logged-in user's username
        const likedResponse = await fetch(`/api/history?user_username=${user_username}`);
        if (!likedResponse.ok) {
          throw new Error("Failed to fetch liked posts");
        }
        const likedData = await likedResponse.json();

        // Initialize likedPosts state with post IDs of liked posts
        const likedPostIds = likedData.map(post => post.post_id);
        setLikedPosts(new Set(likedPostIds));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // Fetch posts from database
  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        //setLikedPosts(new Set(data.likedPosts));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching homepage posts:", error);
        setLoading(false);
      });
  }, []);
  
  // Handle Like Button Toggle (Like & Unlike)
  const handleLikeToggle = async (post_id) => {
    const isLiked = likedPosts.has(post_id);
    const action = isLiked ? "unlike" : "like";
    console.log(`Liking: ${action} for post_id: ${post_id}`);

    try {
      // Update UI instantly
      setPosts(posts.map(post =>
        post.post_id === post_id
          ? { ...post, like_amount: post.like_amount + (isLiked ? -1 : 1) }
          : post
      ));

      await fetch("/api/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id, action }),
      });


      // Toggle liked state
      const updatedLikedPosts = new Set(likedPosts);
      if (isLiked) updatedLikedPosts.delete(post_id);
      else updatedLikedPosts.add(post_id);
      setLikedPosts(updatedLikedPosts);

      // Log the updated likedPosts state
      console.log("Updated likedPosts:", [...updatedLikedPosts]);

    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  // Handle Save Button Toggle (Save & Unsave)
  const handleSaveToggle = async (post_id) => {
    const updatedPosts = posts.map((post) => {
      if (post.post_id === post_id) {
        return { ...post, post_savedindatabase: post.post_savedindatabase === 1 ? 0 : 1 };
      }
      return post;
    });
  
    setPosts(updatedPosts); // Update UI immediately
  
    const action = updatedPosts.find(post => post.post_id === post_id).post_savedindatabase === 1 ? "save" : "unsave";
    console.log(`Toggling save: ${action} for post_id: ${post_id}`);
  
    try {
      await fetch("/api/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id, action }),
      });
    } catch (error) {
      console.error("Error updating save:", error);
    }
  };
  
  // Handle Share Button Click
  const handleShare = (post_id) => {
    // Increment share count in the UI
    setPosts(posts.map(post =>
      post.post_id === post_id
        ? { ...post, share_amount: post.share_amount + 1 }
        : post
    ));

    // Simulate sharing (e.g., copy link to clipboard)
    const postLink = `https://example.com/post/${post_id}`;
    navigator.clipboard.writeText(postLink)
      .then(() => alert("Post link copied to clipboard!"))
      .catch(() => alert("Failed to copy link."));
  };

  // Handle View Count (Simulate incrementing views)
  const handleView = (post_id) => {
    setPosts(posts.map(post =>
      post.post_id === post_id
        ? { ...post, view_amount: post.view_amount + 1 }
        : post
    ));
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-white p-6">
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
          {loading ? (
            <p>Loading homepage posts...</p>
          ) : posts.length > 0 ? (
            posts.map(post => (
              <div key={post.post_id} className="p-4 border border-gray-400 rounded-lg bg-gray-900">
                <h3 className="font-semibold">Posted by: {post.user_username}</h3>
                <p className="text-sm">{post.post_content}</p>
                <div className="flex space-x-2 mt-2">
                  <button 
                    className={`px-4 py-2 rounded-lg text-white ${likedPosts.has(post.post_id) ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`} 
                    onClick={() => handleLikeToggle(post.post_id)}
                  >
                    {likedPosts.has(post.post_id) ? '👎 Unlike' : '👍 Like'} ({post.like_amount})
                  </button>

                  <button
                    className="bg-yellow-500 px-4 py-2 rounded-lg text-white hover:bg-yellow-600"
                    onClick={() => handleShare(post.post_id)}
                  >
                    🔗 Share ({post.share_amount})
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-white ${post.post_savedindatabase === 1 ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                    onClick={() => handleSaveToggle(post.post_id)}
                  >
                    {post.post_savedindatabase === 1 ? '📌 Unsave' : '📌 Save'}
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  <span>👁️ Views: {post.view_amount}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
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

      {/* Link to Posting Area */}
<div className="w-4/5 mt-8">
  <Link href="/postingarea" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
    Go to Posting Area
  </Link>
</div>
      </div>
    </div>
  );
}
