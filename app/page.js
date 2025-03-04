"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useUser } from "../components/UserContext";
import PostList from "../components/PostList";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState(new Set()); // Track liked posts
  const [visibleCommentsCount, setVisibleCommentsCount] = useState({}); // { post_id: number }


  // Replace with the logged-in user's username
  const current_user = user.user_username; 

  const handleSearch = async () => {
    try {
      const res = await fetch("/api/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");
      const data = await res.json();
      setResponse(data.answer);
    } catch (error) {
      console.error("Error fetching RAG response:", error);
      setResponse("Error fetching response.");
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch all posts
const fetchPosts = async () => {
  try {
    const postsResponse = await fetch("/api/home");
    if (!postsResponse.ok) {
      throw new Error("Failed to fetch posts");
    }
    const postsData = await postsResponse.json();

    // Ensure `comments` exists as an array
    const postsWithComments = postsData.map(post => ({
      ...post,
      comments: post.comments || [],
    }));

    setPosts(postsWithComments);
    
  } catch (error) {
    console.error("Error fetching homepage posts:", error);
  } finally {
    setLoading(false);
  }
};

// Fetch liked posts (only if user is logged in)
const fetchLikedPosts = async () => {
  if (!current_user) return; // Ensure function only runs if user exists

  console.log("Fetching liked posts for:", current_user);
  try {
    const likedResponse = await fetch(`/api/history?user_username=${current_user}`);
    if (!likedResponse.ok) {
      throw new Error("Failed to fetch liked posts");
    }
    const likedData = await likedResponse.json();

    if (!Array.isArray(likedData)) {
      console.error("Unexpected API response format:", likedData);
      return;
    }

    const likedPostIds = new Set(likedData.map(post => post.post_id));
    setLikedPosts(likedPostIds);
    console.log("Extracted Liked Post IDs:", Array.from(likedPostIds));
  } catch (error) {
    console.error("Error fetching liked posts:", error);
  } finally {
         setLoading(false);
    }
};

// Fetch all posts when the component mounts
useEffect(() => {
  fetchPosts();
}, []);

// Fetch liked posts only when a user is logged in
useEffect(() => {
  if (current_user) {
    fetchLikedPosts();
  }
}, [current_user]);

useEffect(() => {
  if (!posts || !Array.isArray(posts)) return;

  // Initialize visible comments count for each post if not set
  setVisibleCommentsCount(prev => {
    const updated = { ...prev };
    posts.forEach(post => {
      if (!(post.post_id in updated)) {
        updated[post.post_id] = 3; // Limit to 3 comments initially
      }
    });
    return updated;
  });
}, [posts]);



return (
  <div className="flex flex-col items-center min-h-screen text-white p-6">

    <div className="w-4/5 bg-gray-900 p-6 shadow-lg rounded-lg flex flex-col h-96">
      <h2 className="text-2xl font-bold mb-4">Ask Anything</h2>
      <input
        type="text"
        className="p-2 border bg-gray-800 text-white rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Ask a question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-2"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
      <div className="p-4 mt-4 bg-gray-800 rounded-lg">
        {response && <p>{response}</p>}
      </div>
    </div>

    <div className="w-4/5 mt-8">
      <h2 className="text-2xl font-bold">Latest Posts</h2>
      <div className="mt-4 space-y-4">
      {loading ? <p>Loading homepage posts...</p> : 
      <PostList posts={posts} 
      likedPosts={likedPosts} 
      setLikedPosts={setLikedPosts} 
      setPosts={setPosts} 
      current_user={current_user}
      visibleCommentsCount={visibleCommentsCount}
      setVisibleCommentsCount={setVisibleCommentsCount}
      fetchData={fetchPosts} />}
      </div>
    </div>
  </div>
);
}


