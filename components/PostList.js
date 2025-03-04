"use client";
import React, { useState, useEffect, useRef } from "react";
import { useUser } from "./UserContext";

export default function PostList({
  posts,
  likedPosts,
  setLikedPosts,
  setPosts,
  visibleCommentsCount,
  setVisibleCommentsCount,
  fetchData,
}) {
  const { user } = useUser();
  const current_user = user.user_username;
  const [commentTexts, setCommentTexts] = useState({});
  
  const handleLikeToggle = async (post_id) => {
    if (!user || !user.user_username) {
      return alert("You must be logged in to like posts.");
    }
    const isLiked = likedPosts.has(post_id);
    const action = isLiked ? "unlike" : "like";

    try {
      await fetch("/api/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id, action, user_username: current_user }),
      });

      // Correctly update state
      setLikedPosts((prev) => {
        const updatedLikedPosts = new Set(prev);
        if (isLiked) updatedLikedPosts.delete(post_id);
        else updatedLikedPosts.add(post_id);

        // // Persist in localStorage
        return updatedLikedPosts; // Ensure React re-renders
      });

      // Ensure UI updates `like_amount` correctly
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
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
    if (!user || !user.user_username) {
      return alert("You must be logged in to save posts.");
    }
    const updatedPosts = posts.map((post) => {
      if (post.post_id === post_id) {
        return {
          ...post,
          post_savedindatabase: post.post_savedindatabase === 1 ? 0 : 1,
        };
      }
      return post;
    });

    setPosts(updatedPosts); // Update UI immediately

    const action =
      updatedPosts.find((post) => post.post_id === post_id)
        .post_savedindatabase === 1
        ? "save"
        : "unsave";
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
  const handleShare = async (post_id) => {
    try {
      // Optimistically update the UI first
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.post_id === post_id
            ? { ...post, share_amount: post.share_amount + 1 }
            : post
        )
      );

      await fetch("/api/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id, action: "incrementShare" }),
      });

      // Copy post link to clipboard
      const postLink = `http://localhost:3000/`;
      await navigator.clipboard.writeText(postLink);

      alert("Post link copied to clipboard!");
    } catch (error) {
      console.error("Error updating share count:", error);
      // Rollback UI update if request fails
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.post_id === post_id
            ? { ...post, share_amount: post.share_amount - 1 }
            : post
        )
      );

      alert("Failed to share post.");
    }
  };

  // Handle View Count (Simulate incrementing views)
  const handleView = async (post_id) => {
    try {
      // Increment the view count in the backend
      await fetch("/api/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id, action: "incrementView" }),
      });

      // Increment the view count in the frontend
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.post_id === post_id
            ? { ...post, view_amount: post.view_amount + 1 }
            : post
        )
      );
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  };

  // Function to fetch additional comments
  const fetchMoreComments = async (post_id) => {
    setVisibleCommentsCount((prev) => ({
      ...prev,
      [post_id]: (prev[post_id] || 3) + 3, // Load 3 more each time
    }));
  };

  // Handle comment text input change
  const handleCommentTextChange = (post_id, text) => {
    setCommentTexts((prev) => ({
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
    if (!comment_text?.trim()) return; // Do nothing if the comment is empty
    try {
      const response = await fetch("/api/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_id,
          user_username: current_user,
          comment_text,
          action: "addComment",
        }),
      });
      if (!response.ok) throw new Error("Failed to add comment");
      const newComment = await response.json();

      // Ensure the new comment has a unique `comment_id`
      if (!newComment.comment_id) {
        throw new Error("New comment is missing a `comment_id`");
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.post_id === post_id
            ? { ...post, comments: [newComment, ...(post.comments || [])] }
            : post
        )
      );
      setCommentTexts((prev) => ({
        ...prev,
        [post_id]: "",
      }));
      fetchData();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const hasViewed = useRef(new Set());
  useEffect(() => {
    if (!Array.isArray(posts)) {
      console.error("posts is not an array:", posts);
      return; // Exit early to avoid the error
    }
    posts.forEach((post) => {
      if (!hasViewed.current.has(post.post_id)) {
        hasViewed.current.add(post.post_id);
        handleView(post.post_id);
      }
    });
  }, [posts]);

  return (
    <div className="mt-4 space-y-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.post_id}
            className="p-4 border border-gray-400 rounded-lg bg-gray-900"
          >
            <h3 className="font-semibold">Posted by: {post.user_username}</h3>
            <p className="text-sm">{post.post_content}</p>

            <div className="flex space-x-2 mt-2">
              {/* Like Button */}
              <button
                className={`px-4 py-2 rounded-lg text-white ${
                  likedPosts.has(post.post_id)
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                onClick={() => handleLikeToggle(post.post_id)}
              >
                {likedPosts.has(post.post_id) ? "👎 Unlike" : "👍 Like"} (
                {post.like_amount})
              </button>

              {/* Share Button */}
              <button
                className="bg-yellow-500 px-4 py-2 rounded-lg text-white hover:bg-yellow-600"
                onClick={() => handleShare(post.post_id)}
              >
                🔗 Share ({post.share_amount})
              </button>

              {/* Save Button */}
              <button
                className={`px-4 py-2 rounded-lg text-white ${
                  post.post_savedindatabase === 1
                    ? "bg-purple-500 hover:bg-purple-600"
                    : "bg-gray-500 hover:bg-gray-600"
                }`}
                onClick={() => handleSaveToggle(post.post_id)}
              >
                {post.post_savedindatabase === 1 ? "📌 Unsave" : "📌 Save"}
              </button>

              {/* Add Comment Button */}
              <button
                className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600"
                onClick={() =>
                  addComment(post.post_id, commentTexts[post.post_id])
                }
              >
                💬 Add Comment
              </button>
            </div>

            {/* Comment Input */}
            <div className="mt-1">
              <textarea
                className="w-full p-2 border rounded-lg bg-gray-800 text-white"
                placeholder="Enter your comment..."
                value={commentTexts[post.post_id] || ""}
                onChange={(e) =>
                  handleCommentTextChange(post.post_id, e.target.value)
                }
                rows={1}
              />
            </div>

            {/* Display Comments */}
            <div className="mt-4 space-y-2">
              {post.comments
                ?.slice(0, visibleCommentsCount[post.post_id] || 3)
                .map((comment) => (
                  <div
                    key={comment.comment_id}
                    className="p-2 bg-gray-800 rounded-lg"
                  >
                    <strong>{comment.user_username}: </strong>
                    {comment.comment_text}
                  </div>
                ))}
            </div>

            {/* View More Comments Button */}
            {post.comments?.length > 3 &&
              visibleCommentsCount[post.post_id] < post.comments.length && (
                <button
                  className="mt-2 text-blue-500 hover:text-blue-600"
                  onClick={() => fetchMoreComments(post.post_id)}
                >
                  View more Comments
                </button>
              )}

            {/* Post Info */}
            <div className="mt-2 text-sm text-gray-400">
              <span>👁️ Views: {post.view_amount}</span>
            </div>
            <div className="mt-2 text-sm text-gray-400">
              <span>
                🕒 Posted At: {new Date(post.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
