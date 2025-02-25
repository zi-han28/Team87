// src/components/Profile.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; // Next.js Link component

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch profile data from the backend
        const fetchProfile = async () => {
          try {
            const response = await fetch('http://localhost:5030/profile', {
            //   credentials: 'include', // Include cookies for session management
            });
    
            if (response.ok) {
              const data = await response.json();
              setUser(data);
            } else {
              alert('Failed to fetch profile data. Please log in.');
              window.location.href = '/login';
            }
          } catch (err) {
            alert('An error occurred. Please try again.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchProfile();
      }, []);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (!user) {
        return <div>No user data found. Please log in.</div>;
      }

  const [bio, setBio] = useState(
    "Hi! I'm a passionate developer who loves building web applications."
  );
  const [isEditingBio, setIsEditingBio] = useState(false);

  const activities = [
    { id: 1, title: "Joined the platform", date: "2024-01-15" },
    { id: 2, title: "Completed profile setup", date: "2024-01-16" },
    { id: 3, title: "Posted first project", date: "2024-01-17" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
              {user.username[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{user.username}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Self Introduction Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Introduction
            </h2>
            <button
              onClick={() => setIsEditingBio(!isEditingBio)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {isEditingBio ? "Cancel" : "Edit"}
            </button>
          </div>

          {isEditingBio ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 border rounded-lg"
              rows="4"
            />
          ) : (
            <p className="text-gray-700 whitespace-pre-line">{bio}</p>
          )}

          {isEditingBio && (
            <button
              onClick={() => setIsEditingBio(false)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          )}
        </div>

        {/* Activity Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">{activity.title}</p>
                  <span className="text-sm text-gray-500">{activity.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
