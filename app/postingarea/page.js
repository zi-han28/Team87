

// "use client";
// import React, { useState, useEffect } from 'react';

// export default function PostingArea() {
//   // Default posts
//   const defaultPosts = [
//     {
//       id: 1,
//       title: "What is Newton's law?",
//       text: "Newton's laws of motion are three fundamental principles...",
//       liked: false,
//       likes: 100,
//       comments: [
//         "Great explanation!",
//         "I learned a lot from this post.",
//         "Can you provide more examples?"
//       ],
//       bookmarked: false
//     },
//     {
//       id: 2,
//       title: "What is Law of Demand?",
//       text: "The Law of Demand describes the relationship between price...",
//       liked: false,
//       likes: 100,
//       comments: ["Which component is the most important?"],
//       bookmarked: false
//     },
//     {
//       id: 3,
//       title: "What components make up a phone?",
//       text: "A phone consists of multiple components...",
//       liked: false,
//       likes: 100,
//       comments: [
//         "This is a very timely topic.",
//         "How did the pandemic affect the global economy?"
//       ],
//       bookmarked: false
//     },
//     {
//       id: 4,
//       title: "Which countries were most affected by COVID?",
//       text: "Many countries were...",
//       liked: false,
//       likes: 169,
//       comments: [],
//       bookmarked: false
//     }
//   ];

//   // Load posts from localStorage or initialize with defaultPosts
//   const [posts, setPosts] = useState(() => {
//     if (typeof window !== "undefined") {
//       const savedPosts = JSON.parse(localStorage.getItem('posts'));
//       if (savedPosts) {
//         return savedPosts;
//       } else {
//         // Save defaultPosts to localStorage if no posts are found
//         localStorage.setItem('posts', JSON.stringify(defaultPosts));
//         return defaultPosts;
//       }
//     }
//     return defaultPosts;
//   });

//   // State for new post input
//   const [newPostTitle, setNewPostTitle] = useState('');
//   const [newPostText, setNewPostText] = useState('');

//   // Save posts to localStorage
//   const savePosts = (posts) => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem('posts', JSON.stringify(posts));
//     }
//   };

//   // Handle adding a new post
//   const handleAddPost = () => {
//     if (newPostTitle.trim() && newPostText.trim()) {
//       const newPost = {
//         id: posts.length + 1, // Generate a new ID
//         title: newPostTitle,
//         text: newPostText,
//         liked: false,
//         likes: 0,
//         comments: [],
//         bookmarked: false
//       };

//       // Prepend the new post to the beginning of the posts array
//       const updatedPosts = [newPost, ...posts];
//       setPosts(updatedPosts);
//       savePosts(updatedPosts);

//       // Clear input fields
//       setNewPostTitle('');
//       setNewPostText('');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen text-white p-6">
//       <h1 className="text-3xl font-bold mb-8">Posting Area</h1>

//       {/* Form to create a new post */}
//       <div className="w-4/5 bg-gray-900 p-6 shadow-lg rounded-lg mb-8">
//         <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
//         <div className="space-y-4">
//           <input
//             type="text"
//             className="w-full p-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter post title..."
//             value={newPostTitle}
//             onChange={(e) => setNewPostTitle(e.target.value)}
//           />
//           <textarea
//             className="w-full p-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter post text..."
//             value={newPostText}
//             onChange={(e) => setNewPostText(e.target.value)}
//             rows={4}
//           />
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//             onClick={handleAddPost}
//           >
//             Add Post
//           </button>
//         </div>
//       </div>

//       {/* Display all posts */}
//       <div className="w-4/5">
//         <h2 className="text-2xl font-bold mb-4">All Posts</h2>
//         <div className="space-y-4">
//           {posts.map(post => (
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
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }