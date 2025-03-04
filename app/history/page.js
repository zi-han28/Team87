"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from "../../components/UserContext";
import PostList from "../../components/PostList";


export default function HistoryPage() {
  
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  // Get the logged-in user from context
  const { user } = useUser();
  const [visibleCommentsCount, setVisibleCommentsCount] = useState({}); // { post_id: number }
  const current_user = user.user_username; 
  const fetchLikedPosts = async () => {
    try {
      const user_username = user.user_username; // Replace with the logged-in user's username
      const response = await fetch(`/api/history?user_username=${user_username}`);
      if (!response.ok) {
        throw new Error("Failed to fetch liked posts");
      }
      const data = await response.json();
      setPosts(data);
      // Initialize visible comments count (3 comments per post by default)
    const initialVisibleComments = {};
    data.forEach(post => {
      initialVisibleComments[post.post_id] = 3; // Show 3 comments by default
    });
    setVisibleCommentsCount(initialVisibleComments);
      const likedPostIds = new Set(data.map(post => post.post_id));
      setLikedPosts(likedPostIds);
    } catch (error) {
      console.error("Error fetching liked posts:", error);
    } finally {
      setLoading(false);
    }
  };
  // Fetch liked posts from the database for the current user
  useEffect(() => {
    if (current_user) {
        fetchLikedPosts();
    }
  }, [current_user]);


  return (
    <div className="flex flex-col items-center min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Liked Posts History</h1>
      <div className="w-4/5">
              {loading ? <p>Loading homepage posts...</p> : 
                    <PostList posts={posts} 
                    likedPosts={likedPosts} 
                    setLikedPosts={setLikedPosts} 
                    setPosts={setPosts} 
                    current_user={current_user}
                    visibleCommentsCount={visibleCommentsCount}
                    setVisibleCommentsCount={setVisibleCommentsCount}
                    fetchData={fetchLikedPosts} />}
            </div>
    </div>
  );
}
