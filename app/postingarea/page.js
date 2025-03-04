"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "../../components/UserContext";
import PostList from "../../components/PostList";

export default function PostingArea() {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState("");
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState(new Set()); // Track liked posts
  const { user } = useUser();
  const [visibleCommentsCount, setVisibleCommentsCount] = useState({}); // { post_id: number }

  const current_user = user.user_username; 

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/postingarea");
      console.log("Fetching posts...");
      if (!response.ok) {
        throw new Error("Failed to fetch posts: ${response.statusText}");
      }
      const data = await response.json();
      const postsWithComments = data.map(post => ({
        ...post,
        comments: post.comments || [],
      }));
  
      setPosts(postsWithComments);

    } catch (error) {
      console.error("Error fetching posts:", error);
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
    

  // Handle adding a new post
  const handleAddPost = async () => {
    //check if user is logged in
    if (!current_user) {
      alert("Failed to post. Try logging in before posting.");
      return;
    }
    if (newPostText.trim()) {
      const newPost = {
        post_content: newPostText, // API expects `post_content`, not `text`
        user_username: user.user_username, 
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
        // Add the new post at the top
        setNewPostText("");
        fetchPosts();
        fetchLikedPosts();
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
            className="w-full p-2 border rounded-lg bg-gray-800 text-white"
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
  );
}
