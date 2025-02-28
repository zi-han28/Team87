//frontend for [chatroomId]
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "../../../components/UserContext";

export default function Chatroom() {
  const { chatroomId } = useParams();
  const [chatroom, setChatroom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUser(); // Get the logged-in user from context

  // Fetch chatroom details
  useEffect(() => {
    fetch(`/api/chatrooms/${chatroomId}`)
      .then((response) => response.json())
      .then((data) => setChatroom(data))
      .catch((error) => console.error("Error fetching chatroom:", error));
  }, [chatroomId]);

  // Fetch messages for the chatroom
  useEffect(() => {
    fetch(`/api/messages?chatroomId=${chatroomId}`)
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, [chatroomId]);

  // Send a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    if (!user.isLoggedIn) {
      alert("Failed to send message. Try logging in before sending a message.");
      return;
    }

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatroomId,
          sender: user.user_username, // Use the logged-in user's username
          message: newMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setNewMessage("");
      // Fetch messages again to update the chat
      fetch(`/api/messages?chatroomId=${chatroomId}`)
        .then((response) => response.json())
        .then((data) => setMessages(data));
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message. Try logging in before sending a message.");
    }
  };

  if (!chatroom) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <button
        type="button"
        onClick={() => history.back()}
        className="block p-4 rounded-lg shadow-md border border-gray-300 hover:bg-gray-200 hover:text-[#613DC1] hover:shadow-lg transition duration-300 bg-[#613DC1]"
      >
        <div className="flex flex-row align-middle">
          <svg
            className="w-5 mr-2 group-hover:fill-white transition duration-100"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <p className="ml-2">back</p>
        </div>
      </button>
      <h1 className="text-3xl text-[#613DC1] text-center font-bold mb-8">
        {chatroom.name}
      </h1>
      <div className="rounded-lg shadow-md p-4">
        {/* Messages */}
        <div className=" h-96 overflow-y-auto mb-4">
          {messages.map((message) => (
            <div key={message.id} className="flex">
            <div className="w-20 h-20 rounded-full bg-[#613DC1] flex items-center justify-center text-white text-2xl">
            {message.sender ? message.sender[0].toUpperCase() : "?"}
            </div>
              <div className="mb-4 bg-purple-500 rounded-lg ml-[5px]">
                <div className="font-semibold pl-[8px]">{message.sender}</div>
                <div className="pt-[10px] pr-[20px] pl-[8px]">{message.message}</div>
                <div className="text-sm pl-[8px]">{new Date(message.timestamp).toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 text-white p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
