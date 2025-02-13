"use client";
import React, { useEffect, useState } from 'react';

export default function BookmarkPage() {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  // Load bookmarked posts from localStorage
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
    const defaultPosts = [
      { id: 1, title: "What is Newton's law?", text: "Newton's laws of motion are three fundamental principles...", liked: false, likes: 100, comments: [], bookmarked: false },
      { id: 2, title: "What is Law of Demand?", text: "The Law of Demand describes the relationship between price...", liked: false, likes: 100, comments: [], bookmarked: false },
      { id: 3, title: "What components make up a phone?", text: "A phone consists of multiple components...", liked: false, likes: 100, comments: [], bookmarked: false }
    ];
    const posts = defaultPosts.map(post => ({
      ...post,
      bookmarked: savedBookmarks[post.id] || false
    }));
    setBookmarkedPosts(posts.filter(post => post.bookmarked));
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Bookmarked Posts</h1>
      <div className="w-4/5 space-y-4">
        {bookmarkedPosts.length > 0 ? (
          bookmarkedPosts.map(post => (
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
          <p>No bookmarked posts found.</p>
        )}
      </div>
    </div>
  );
}