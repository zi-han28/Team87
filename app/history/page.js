"use client";
import React, { useEffect, useState } from 'react';

export default function HistoryPage() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch liked posts from the database
  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await fetch("/api/history");
        if (!response.ok) {
          throw new Error("Failed to fetch liked posts");
        }
        const data = await response.json();
        setLikedPosts(data);
      } catch (error) {
        console.error("Error fetching liked posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedPosts();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Liked Posts History</h1>
      <div className="w-4/5 space-y-4">
        {loading ? (
          <p>Loading liked posts...</p>
        ) : likedPosts.length > 0 ? (
          likedPosts.map(post => (
            <div key={post.post_id} className="p-4 border border-gray-400 rounded-lg bg-gray-900">
              <h3 className="font-semibold">Posted by: {post.user_username}</h3>
              <p className="text-sm">{post.post_content}</p>
              <div className="mt-2 text-sm text-gray-400">
                <span>👍 Likes: {post.like_amount}</span>
                <span className="ml-4">👁️ Views: {post.view_amount}</span>
                <span className="ml-4">🔗 Shares: {post.share_amount}</span>
              </div>
              <div className="flex space-x-2 mt-2">
                <button className="bg-yellow-500 px-4 py-2 rounded-lg text-white">
                  💬 Comment
                </button>
                <button className="bg-gray-600 px-4 py-2 rounded-lg text-white">
                  🔗 Share
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