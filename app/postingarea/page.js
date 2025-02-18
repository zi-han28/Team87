"use client";
import React, { useState, useEffect } from 'react';

export default function PostingArea() {
  const [posts, setPosts] = useState([]);
  //const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostText, setNewPostText] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch posts from the database
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/postingarea");
        console.log("Fetching posts..."); 
        if (!response.ok) {
          throw new Error("Failed to fetch posts: ${response.statusText}");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle adding a new post
  const handleAddPost = async () => {
    if (newPostText.trim()) {
        const newPost = {
            post_content: newPostText,  // API expects `post_content`, not `text`
            user_username: "test_user" // Replace with actual username from auth context
          };
          
      
      try {
        const response = await fetch("/api/postingarea", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        });

        if (!response.ok) {
          throw new Error("Failed to add post");
        }

        const savedPost = await response.json();
        setPosts([savedPost, ...posts]); // Add the new post at the top
        //setNewPostTitle('');
        setNewPostText('');
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Posting Area</h1>

      {/* Form to create a new post */}
      <div className="w-4/5 bg-gray-900 p-6 shadow-lg rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
        <div className="space-y-4">
          
          <textarea
            className="w-full p-2 border rounded-lg text-black"
            placeholder="Enter post text..."
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            rows={4}
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleAddPost}>
            Add Post
          </button>
        </div>
      </div>

      {/* Display all posts */}
      <div className="w-4/5">
        <h2 className="text-2xl font-bold mb-4">All Posts</h2>
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length > 0 ? (
            posts.map(post => (
              <div key={post.post_id} className="p-4 border border-gray-400 rounded-lg bg-gray-900">
                <h3 className="font-semibold">Posted by: {post.user_username}</h3>
                <p className="text-sm">{post.post_content}</p>
                
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
    </div>
  );
}


// "use client";
// import React, { useState, useEffect } from 'react';

// export default function PostingArea() {
  
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