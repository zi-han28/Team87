"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from "../../components/UserContext";
import PostList from "../../components/PostList";

export default function Bookmark() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Get the logged-in user from context
  const { user } = useUser();
  const [likedPosts, setLikedPosts] = useState(new Set()); // Track liked posts
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState({}); // { post_id: number }
  
  const current_user = user.user_username; 
  // Fetch bookmarked posts
  useEffect(() => {
    fetch("/api/bookmark")
      .then((res) => res.json())
      .then((data) => {
        const bookmarkedWithComments = data.map(post => ({
          ...post,
          comments: post.comments || [] // Ensure comments is an array
        }));
        setBookmarkedPosts(bookmarkedWithComments);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookmarked posts:", error);
        setLoading(false);
      });
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all posts
      const postsResponse = await fetch("/api/bookmark");
      if (!postsResponse.ok) {
        throw new Error("Failed to fetch posts");
      }
      const postsData = await postsResponse.json();
      const postsWithComments = postsData.map(post => ({
        ...post,
        comments: post.comments || [], // Ensure `comments` is an array
      }));
  
      setBookmarkedPosts(postsWithComments);
        // Initialize visible comments count (3 comments per post by default)
        const initialVisibleComments = {};
        postsData.forEach(post => {
          initialVisibleComments[post.post_id] = 1; // Show 3 comments by default
        });
  
        setVisibleCommentsCount(initialVisibleComments);


        if (current_user) {
          const likedResponse = await fetch(`/api/history?user_username=${current_user}`);
          if (!likedResponse.ok) {
            throw new Error("Failed to fetch liked posts");
          }
          const likedData = await likedResponse.json();
    
          // Initialize likedPosts state with post IDs of liked posts
          const likedPostIds = new Set(likedData.map(post => post.post_id));
          setLikedPosts(likedPostIds);
        }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

    // Fetch all posts and liked posts for the current user
    useEffect(() => {
      if (current_user) {
          fetchData();
      }
    }, [current_user]);
  

  return (
    <div className="flex flex-col items-center min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Bookmarked Posts</h1>

      <div className="w-4/5">
        {loading ? <p>Loading homepage posts...</p> : 
              <PostList posts={bookmarkedPosts} 
              likedPosts={likedPosts} 
              setLikedPosts={setLikedPosts} 
              setPosts={setBookmarkedPosts} 
              current_user={current_user}
              visibleCommentsCount={visibleCommentsCount}
              setVisibleCommentsCount={setVisibleCommentsCount}
              fetchData={fetchData} />}
      </div>
    </div>
  );
}
