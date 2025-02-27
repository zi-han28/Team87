"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from "../../components/UserContext";

export default function HistoryPage() {
  
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [Posts, setPosts] = useState([]);
  const { user } = useUser();
  const [comments, setComments] = useState({}); // { post_id: [comments] }
  const [visibleCommentsCount, setVisibleCommentsCount] = useState({}); // { post_id: number }
  const [commentTexts, setCommentTexts] = useState({});
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
    fetchLikedPosts();
  }, []);


  const handleLikeToggle = async (post_id) => {
    if (!user || !user.user_username) {
        return alert("You must be logged in to like posts.");}
    const isLiked = likedPosts.has(post_id);
    const action = isLiked ? "unlike" : "like";
  
    try {
      await fetch("/api/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id, action, user_username: "test_user" }), // Ensure `user_username` is passed
      });
  
      // Correctly update state
      setLikedPosts(prev => {
        const updatedLikedPosts = new Set(prev);
        if (isLiked) updatedLikedPosts.delete(post_id);
        else updatedLikedPosts.add(post_id);
        return new Set(updatedLikedPosts);  // Ensure React re-renders
      });
  
      // Ensure UI updates `like_amount` correctly
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.post_id === post_id
            ? { ...post, like_amount: post.like_amount + (isLiked ? -1 : 1) }
            : post
        )
      );
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };
  
  // Handle Save Button Toggle (Save & Unsave)
  const handleSaveToggle = async (post_id) => {
    const updatedPosts = posts.map((post) => {
      if (post.post_id === post_id) {
        return { ...post, post_savedindatabase: post.post_savedindatabase === 1 ? 0 : 1 };
      }
      return post;
    });
  
    setPosts(updatedPosts); // Update UI immediately
  
    const action = updatedPosts.find(post => post.post_id === post_id).post_savedindatabase === 1 ? "save" : "unsave";
    console.log(`Toggling save: ${action} for post_id: ${post_id}`);
  
    try {
      await fetch("/api/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id, action }),
      });
    } catch (error) {
      console.error("Error updating save:", error);
    }
  };
  
  // Handle Share Button Click
  const handleShare = (post_id) => {
    // Increment share count in the UI
    setPosts(posts.map(post =>
      post.post_id === post_id
        ? { ...post, share_amount: post.share_amount + 1 }
        : post
    ));

    // Simulate sharing (e.g., copy link to clipboard)
    const postLink = `https://example.com/post/${post_id}`;
    navigator.clipboard.writeText(postLink)
      .then(() => alert("Post link copied to clipboard!"))
      .catch(() => alert("Failed to copy link."));
  };

  // Handle View Count (Simulate incrementing views)
  const handleView = (post_id) => {
    setPosts(Posts.map(post =>
      post.post_id === post_id
        ? { ...post, view_amount: post.view_amount + 1 }
        : post
    ));
  };

    // Function to fetch additional comments
const fetchMoreComments = async (post_id) => {
    setVisibleCommentsCount(prev => ({
      ...prev,
      [post_id]: Posts.find(post => post.post_id === post_id).comments.length, // Show all comments
    }));
  };

  // Handle comment text input change
const handleCommentTextChange = (post_id, text) => {
    setCommentTexts(prev => ({
      ...prev,
      [post_id]: text,
    }));
  };

  // Add a comment to a post
const addComment = async (post_id, comment_text) => {
    if (!user.isLoggedIn) {
        alert("Failed to post comment. Try logging in before posting a comment.");
        return;
      }
    if (!comment_text?.trim()) return;
    try {
      const response = await fetch('/api/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          post_id, 
          user_username: user.user_username, 
          comment_text, 
          action: 'addComment' }),
      });
      if (!response.ok) throw new Error('Failed to add comment');
      const newComment = await response.json();
      if (!newComment.comment_id) {
        throw new Error("New comment is missing a `comment_id`");
      }
      
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.post_id === post_id
            ? { ...post, 
              comments: [newComment, ...(post.comments || [])] 
            }
            : post
        )
      );
      setCommentTexts(prev => ({
        ...prev,
        [post_id]: '',
      }));
      fetchLikedPosts();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  

  return (
    <div className="flex flex-col items-center min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Liked Posts History</h1>
      <div className="w-4/5 space-y-4">
        {loading ? (
          <p>Loading liked posts...</p>
        ) : Posts.length > 0 ? (
          Posts.map(post => (
            <div key={post.post_id} className="p-4 border border-gray-400 rounded-lg bg-gray-900">
              <h3 className="font-semibold">Posted by: {post.user_username}</h3>
                <p className="text-sm">{post.post_content}</p>
                <div className="flex space-x-2 mt-2">
                <button 
                    className={`px-4 py-2 rounded-lg text-white ${likedPosts.has(post.post_id) ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`} 
                    onClick={() => handleLikeToggle(post.post_id)}
                  >
                    {likedPosts.has(post.post_id) ? '👎 Unlike' : '👍 Like'} ({post.like_amount})
                  </button>

                  <button
                    className="bg-yellow-500 px-4 py-2 rounded-lg text-white hover:bg-yellow-600"
                    onClick={() => handleShare(post.post_id)}
                  >
                    🔗 Share ({post.share_amount})
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-white ${post.post_savedindatabase === 1 ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                    onClick={() => handleSaveToggle(post.post_id)}
                  >
                    {post.post_savedindatabase === 1 ? '📌 Unsave' : '📌 Save'}
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  <span>👁️ Views: {post.view_amount}</span>
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
