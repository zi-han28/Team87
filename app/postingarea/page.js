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
      console.log("Fetched data:", data);
      setPosts(data);

      // Initialize visible comments count (3 comments per post by default)
      const initialVisibleComments = {};
      data.forEach((post) => {
        initialVisibleComments[post.post_id] = 3; // Show 3 comments by default
      });
      setVisibleCommentsCount(initialVisibleComments);

      // Fetch liked posts for the current user
      const user_username = user.user_username; // Replace with the logged-in user's username
      const likedResponse = await fetch(
        `/api/history?user_username=${user_username}`
      );
      if (!likedResponse.ok) {
        throw new Error("Failed to fetch liked posts");
      }
      const likedData = await likedResponse.json();

      // Initialize likedPosts state with post IDs of liked posts
      const likedPostIds = likedData.map((post) => post.post_id);
      setLikedPosts(new Set(likedPostIds));
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts from the database
  useEffect(() => {
        if (current_user) {
            fetchPosts();
        }
      }, [current_user]);
    

  // Handle adding a new post
  const handleAddPost = async () => {
    //check if user is logged in
    if (!user.isLoggedIn) {
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
                      fetchData={fetchPosts} />}
              </div>
    </div>
  );
}
