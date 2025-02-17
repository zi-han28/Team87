"use client";
import React, { useEffect, useState } from 'react';

export default function HistoryPage() {
  const [likedPosts, setLikedPosts] = useState([]);

  // Define defaultPosts directly in the History page
  const defaultPosts = [
    {
      id: 1,
      title: "What is Newton's law?",
      text: "Newton's laws of motion are three fundamental principles...",
      liked: false,
      likes: 100,
      comments: [
        "Great explanation!",
        "I learned a lot from this post.",
        "Can you provide more examples?"
      ],
      bookmarked: false
    },
    {
      id: 2,
      title: "What is Law of Demand?",
      text: "The Law of Demand describes the relationship between price...",
      liked: false,
      likes: 100,
      comments: ["Which component is the most important?"],
      bookmarked: false
    },
    {
      id: 3,
      title: "What components make up a phone?",
      text: "A phone consists of multiple components...",
      liked: false,
      likes: 100,
      comments: [
        "This is a very timely topic.",
        "How did the pandemic affect the global economy?"
      ],
      bookmarked: false
    },
    {
      id: 4,
      title: "Which countries were most affected by COVID?",
      text: "Many countries were...",
      liked: false,
      likes: 169,
      comments: [],
      bookmarked: false
    }
  ];

  // Function to load liked posts
  // const loadLikedPosts = () => {
  //   if (typeof window !== "undefined") {
  //     const likedData = JSON.parse(localStorage.getItem('liked')) || {};
  //     const posts = defaultPosts.map(post => ({
  //       ...post,
  //       likes: likedData[post.id] || false,
  //       likes: likedData[post.id]?.likes || post.likes
  //     }));

  //     // Filter posts that have been liked
  //     const likedPosts = posts.filter(post => post.liked);

  //     // Sort liked posts in descending order by likes
  //     const sortedLikedPosts = likedPosts.sort((a, b) => b.likes - a.likes);

  //     setLikedPosts(sortedLikedPosts);
  //   }
  // };

  // const loadLikedPosts = () => {
  //   if (typeof window !== "undefined") {
  //     const likedData = JSON.parse(localStorage.getItem('liked')) || {};
      
  //     const posts = defaultPosts.map(post => ({
  //       ...post,
  //       liked: likedData[post.id]?.liked || false,
  //       likes: likedData[post.id]?.likes || post.likes // Load updated likes count
  //     }));
  
  //     const likedPosts = posts.filter(post => post.liked);
  //     setLikedPosts(likedPosts.sort((a, b) => b.likes - a.likes));
  //   }
  // };

  const loadLikedPosts = () => {
    const savedLikes = JSON.parse(localStorage.getItem('likesData')) || {};
    const likedPosts = defaultPosts
      .map(post => ({
        ...post,
        liked: savedLikes[post.id]?.liked || false,
        likes: savedLikes[post.id]?.likes ?? post.likes, // Keep updated likes count
      }))
      .filter(post => post.liked);
  
    setLikedPosts(likedPosts);
  };
  

  // Load liked posts on mount
  useEffect(() => {
    loadLikedPosts();
  }, []);

  // Listen for custom event to reload liked posts
  useEffect(() => {
    const handleLikedStateChange = () => {
      if (typeof window !== "undefined") {
        loadLikedPosts();
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || defaultPosts;

  
        // Filter posts that have been liked
        const liked = savedPosts.filter(post => post.liked);
  
        // Sort liked posts in descending order by likes
        const sortedLikedPosts = liked.sort((a, b) => b.likes - a.likes);
  
        setLikedPosts(sortedLikedPosts);
      }
    };
  
    window.addEventListener('likedStateChanged', handleLikedStateChange);
  
    return () => {
      window.removeEventListener('likedStateChanged', handleLikedStateChange);
    };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Liked Posts History</h1>
      <div className="w-4/5 space-y-4">
        {likedPosts.length > 0 ? (
          likedPosts.map(post => (
            <div key={post.id} className="p-4 border border-gray-400 rounded-lg bg-gray-900">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm">{post.text}</p>
              <div className="flex space-x-2 mt-2">
                <button className={`px-4 py-2 rounded-lg text-white ${post.liked ? 'bg-red-500' : 'bg-blue-500'}`}>
                  {post.liked ? 'Unlike 👎' : 'Like 👍'} ({post.likes})
                </button>
                <button className="bg-yellow-500 px-4 py-2 rounded-lg text-white">
                  💬 Comment ({post.comments.length})
                </button>
                <button className="bg-gray-600 px-4 py-2 rounded-lg text-white">
                  🔗 Share
                </button>
                <button className={`px-4 py-2 rounded-lg text-white ${post.bookmarked ? 'bg-purple-500' : 'bg-gray-500'}`}>
                  {post.bookmarked ? 'Unbookmark ❌' : 'Bookmark 📌'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No liked posts found.</p>
        )}
      </div>
    </div>
  );
}