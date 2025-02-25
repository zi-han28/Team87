"use client";
import React, { useState, useEffect } from 'react';

export default function Bookmark() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState(new Set()); // Track liked posts
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  const [comments, setComments] = useState({}); // { post_id: [comments] }
  const [visibleCommentsCount, setVisibleCommentsCount] = useState({}); // { post_id: number }
  const [commentTexts, setCommentTexts] = useState({});
  
  const current_user = "test_user"; // Replace with the logged-in user's username

  // Fetch bookmarked posts
  // useEffect(() => {
  //   fetch("/api/bookmark")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setBookmarkedPosts(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching bookmarked posts:", error);
  //       setLoading(false);
  //     });
  // }, []);

  // Fetch bookmarked posts
  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      try {
        // Fetch bookmarked posts
        const bookmarkedResponse = await fetch("/api/bookmark");
        if (!bookmarkedResponse.ok) {
          throw new Error("Failed to fetch bookmarked posts");
        }
        const bookmarkedData = await bookmarkedResponse.json();

        // Fetch all posts (including comments) from /api/home
        const postsResponse = await fetch("/api/home");
        if (!postsResponse.ok) {
          throw new Error("Failed to fetch posts");
        }
        const postsData = await postsResponse.json();

        // Merge bookmarked posts with their comments from the /api/home response
        const postsWithComments = bookmarkedData.map(bookmarkedPost => {
          const fullPost = postsData.find(post => post.post_id === bookmarkedPost.post_id);
          return { ...bookmarkedPost, comments: fullPost?.comments || [] };
        });

        setBookmarkedPosts(postsWithComments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookmarked posts and comments:", error);
        setLoading(false);
      }
    };

    fetchBookmarkedPosts();
  }, []);


  const fetchData = async () => {
    try {
      // Fetch all posts
      const postsResponse = await fetch("/api/home");
      if (!postsResponse.ok) {
        throw new Error("Failed to fetch posts");
      }
      const postsData = await postsResponse.json();
      //setPosts(postsData);

      const postsWithComments = postsData.map(post => ({
        ...post,
        comments: post.comments || [], // Ensure `comments` is an array
      }));
  
      setPosts(postsWithComments);

      const initialVisibleComments = {};
      postsData.forEach(post => {
        initialVisibleComments[post.post_id] = 3; // Show 3 comments by default
      });
      setVisibleCommentsCount(initialVisibleComments);

      // Fetch liked posts for the current user
      const user_username = current_user; // Replace with the logged-in user's username
      const likedResponse = await fetch(`/api/history?user_username=${user_username}`);
      if (!likedResponse.ok) {
        throw new Error("Failed to fetch liked posts");
      }
      const likedData = await likedResponse.json();

      // Initialize likedPosts state with post IDs of liked posts
      const likedPostIds = likedData.map(post => post.post_id);
      setLikedPosts(new Set(likedPostIds));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

    // Fetch all posts and liked posts for the current user
    useEffect(() => {
      fetchData();
    }, []);
  
  
    const handleLikeToggle = async (post_id) => {
      const isLiked = likedPosts.has(post_id);
      const action = isLiked ? "unlike" : "like";
    
      try {
        await fetch("/api/home", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_id, action, user_username: "testuser" }), // Ensure `user_username` is passed
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
    

      // Update bookmarkedPosts state directly
      setBookmarkedPosts(prevPosts =>
        prevPosts.map(post =>
          post.post_id === post_id
            ? { ...post, post_savedindatabase: post.post_savedindatabase === 1 ? 0 : 1 }
            : post
        )
      );

      const actionB = bookmarkedPosts.find(post => post.post_id === post_id)?.post_savedindatabase === 1 ? "save" : "unsave";
      console.log(`Toggling save: ${actionB} for post_id: ${post_id}`);

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
      setPosts(posts.map(post =>
        post.post_id === post_id
          ? { ...post, view_amount: post.view_amount + 1 }
          : post
      ));
    };
    // Function to fetch additional comments
const fetchMoreComments = async (post_id) => {
  setVisibleCommentsCount(prev => ({
    ...prev,
    [post_id]: bookmarkedPosts.find(post => post.post_id === post_id).comments.length, // Show all comments
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
  if (!comment_text?.trim()) return;
  try {
    const response = await fetch('/api/home', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        post_id, 
        user_username: current_user, 
        comment_text, 
        action: 'addComment' }),
    });
    if (!response.ok) throw new Error('Failed to add comment');
    const newComment = await response.json();

    // Ensure the new comment has a unique `comment_id`
    if (!newComment.comment_id) {
      throw new Error("New comment is missing a `comment_id`");
    }
    
    setBookmarkedPosts(prevPosts =>
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
    fetchData();
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};

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
                  <div className="mt-1">
                <textarea
                  className="w-full p-2 border rounded-lg text-black"
                  placeholder="Enter your comment..."
                  value={commentTexts[post.post_id] || ''}
                  onChange={(e) => handleCommentTextChange(post.post_id, e.target.value)}
                  rows={1}
                />
                
              </div>
              <button
                  className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600 mt-2"
                  onClick={() => addComment(post.post_id, commentTexts[post.post_id])}
                >
                  💬 Add Comment
                </button>
                </div>         
                
                {/* Display initial comments */}
                <div className="mt-4 space-y-2">
                  {post.comments?.slice(0, visibleCommentsCount[post.post_id]).map(comment => (
                    <div key={comment.comment_id} className="p-2 bg-gray-800 rounded-lg">
                      <strong>{comment.user_username}: </strong>{comment.comment_text}
                    </div>
                  ))}
                </div>

                {/* "View more Comments" button */}
                {post.comments?.length > 3 && visibleCommentsCount[post.post_id] < post.comments.length && (
                  <button
                    className="mt-2 text-blue-500 hover:text-blue-600"
                    onClick={() => fetchMoreComments(post.post_id)}
                  >
                    View more Comments
                  </button>
                )}       
                <div className="mt-2 text-sm text-gray-400">
                  <span>👁️ Views: {post.view_amount}</span>
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
