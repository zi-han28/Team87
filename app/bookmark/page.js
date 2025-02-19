"use client";
import React, { useState, useEffect } from 'react';

export default function Bookmark() {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookmarked posts
  useEffect(() => {
    fetch("/api/bookmark")
      .then((res) => res.json())
      .then((data) => {
        setBookmarkedPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookmarked posts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Bookmarked Posts</h1>

      <div className="w-4/5">
        {loading ? (
          <p>Loading bookmarked posts...</p>
        ) : bookmarkedPosts.length > 0 ? (
          bookmarkedPosts.map(post => (
            <div key={post.post_id} className="p-4 border border-gray-400 rounded-lg bg-gray-900 mb-4">
              <h3 className="font-semibold">Posted by: {post.user_username}</h3>
              <p className="text-sm">{post.post_content}</p>
              <div className="mt-2 text-sm text-gray-400">
                <span>👍 Likes: {post.like_amount}</span>
                <span className="ml-4">👁️ Views: {post.view_amount}</span>
                <span className="ml-4">🔗 Shares: {post.share_amount}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No bookmarked posts available.</p>
        )}
      </div>
    </div>
  );
}

// "use client";
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// export default function BookmarkPage() {
//   const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

//   // Load bookmarked posts from localStorage
//   useEffect(() => {
//     const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || {};
//     const defaultPosts = [
//       { id: 1, title: "What is Newton's law?", text: "Newton's laws of motion are three fundamental principles...", liked: false, likes: 100, comments: [], bookmarked: false },
//     { id: 2, title: "What is Law of Demand?", text: "The Law of Demand describes the relationship between price...", liked: false, likes: 100, comments: [], bookmarked: false },
//     { id: 3, title: "What components make up a phone?", text: "A phone consists of multiple components...", liked: false, likes: 100, comments: [], bookmarked: false },
//     { id: 4, title: "Which countries were most affected by COVID?", text: "Many countries were...", liked: false, likes: 169, comments: [], bookmarked: false }
//   ];
//     const posts = defaultPosts.map(post => ({
//       ...post,
//       bookmarked: savedBookmarks[post.id] || false
//     }));
//     setBookmarkedPosts(posts.filter(post => post.bookmarked));
//   }, []);

//   return (
//     <div className="flex flex-col items-center min-h-screen text-white p-6">
//       <h1 className="text-3xl font-bold mb-8">Bookmarked Posts</h1>
//       <div className="w-4/5 space-y-4">
//         {bookmarkedPosts.length > 0 ? (
//           bookmarkedPosts.map(post => (
//             <div key={post.id} className="p-4 border border-gray-400 rounded-lg bg-gray-900">
//               <h3 className="font-semibold">{post.title}</h3>
//               <p className="text-sm">{post.text}</p>
//               <div className="flex space-x-2 mt-2">
//                 <button className={`px-4 py-2 rounded-lg text-white ${post.liked ? 'bg-red-500' : 'bg-blue-500'}`}>
//                   {post.liked ? 'Unlike 👎' : 'Like 👍'} ({post.likes})
//                 </button>
//                 <button className="bg-yellow-500 px-4 py-2 rounded-lg text-white">
//                   💬 Comment ({post.comments.length})
//                 </button>
//                 <button className="bg-gray-600 px-4 py-2 rounded-lg text-white">
//                   🔗 Share
//                 </button>
//                 <button className={`px-4 py-2 rounded-lg text-white ${post.bookmarked ? 'bg-purple-500' : 'bg-gray-500'}`}>
//                   {post.bookmarked ? 'Unbookmark ❌' : 'Bookmark 📌'}
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No bookmarked posts found.</p>
//         )}
//       </div>
//     </div>
//   );
// }