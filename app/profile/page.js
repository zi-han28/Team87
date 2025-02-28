// frontend for sign up page
"use client";

import { useState, useEffect } from "react";
// Next.js Link component
import Link from "next/link"; 
// Correct import path
import { useUser } from "../../components/UserContext"; 

export default function Profile() {
  // Get the logged-in user from context
  const { user, setUser } = useUser();
  // show loading when loading information
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState("");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch profile data from the backend
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile", {
          method: "GET",
          credentials: "include", // Send cookies with request
        });

        if (response.ok) {
          const data = await response.json();
          // Merge fetched data into global user state
          setUser((prevUser) => ({
            ...prevUser,
            ...data, 
          }));
          setBio(data.user_introduction);
          setActivities(data.activities);
        } else {
          alert("Failed to fetch profile data. Please log in.");
          window.location.href = "/login";
        }
      } catch (err) {
        alert("An error occurred. Please try again.");
      } finally {
        // remove loading status
        setLoading(false);
      }
    };
    fetchProfile();
  }, [setUser]);

  // update bio
  const handleSaveBio = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_introduction: bio }),
      });

      if (response.ok) {
        setIsEditingBio(false);
      } else {
        alert("Failed to update introduction. Please type something");
      }
    } catch (err) {
      console.error("Error updating bio:", err);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data found. Please log in.</div>;
  }
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Head section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-6">
            {/* display profile image */}
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
              {user.user_username ? user.user_username[0].toUpperCase() : "?"}
            </div>
            {/* display username and email */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {user.user_username}
              </h1>
              <p className="text-gray-600">{user.user_email}</p>
            </div>
          </div>
        </div>

        {/* Self Introduction Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Introduction
            </h2>
            {/* edit button */}
            <button 
              onClick={() => setIsEditingBio(!isEditingBio)}
              className="text-blue-600 hover:text-blue-800 text-sm">
              {isEditingBio ? "Cancel" : "Edit"}
            </button>
          </div>

          {isEditingBio ? (
            <>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="bg-gray-800 text-white w-full p-3 border rounded-lg"
                rows="4"/>
              <button
                onClick={handleSaveBio}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </>
          ) : (
            // set default introduction
            <p className="text-[#613dc1] whitespace-pre-line">
              {bio || "No introduction yet."}
            </p>
          )}
        </div>

        {/* Activity Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          {/* display recent activity as a list */}
          <ul className="space-y-4">
            {activities.map((activity, index) => (
              <li key={index}>
                {activity.type == "post" && (
                  <div>
                    <strong className="text-gray-700 whitespace-pre-line">Posted:</strong>  <p className="text-[#613dc1] whitespace-pre-line">{activity.post_content}</p>
                  </div>
                )}
                {activity.type == "comment" && (
                  <div>
                    <strong className="text-gray-700 whitespace-pre-line">Commented:</strong> <p className="text-[#613dc1] whitespace-pre-line">{activity.comment_text}</p>
                  </div>
                )}
                {activity.type == 'message'&&(
                  <div>
                    <strong className="text-gray-700 whitespace-pre-line">Messages:</strong> <p className="text-[#613dc1] whitespace-pre-line">{activity.message}</p>
                  </div>
                )
                }
                {/* display activity timestamp */}
                <small className="text-gray-700 whitespace-pre-line">{new Date(activity.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );};
