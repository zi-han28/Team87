import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [messages, setMessages] = useState([
    { user: 'User1', text: 'Hello!' },
    { user: 'User2', text: 'Hi there!' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages(prevMessages => [...prevMessages, { user: 'You', text: newMessage }]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Homepage Section */}
      <div className="w-4/5 p-4 my-4">
        <h1 className="text-3xl font-bold text-center">Homepage</h1>
        <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-500">Home</a></li>
            <li><a href="#" className="hover:text-blue-500">About</a></li>
            <li><a href="#" className="hover:text-blue-500">Services</a></li>
            <li><a href="#" className="hover:text-blue-500">Contact</a></li>
          </ul>
        <div className="p-4 border border-gray-300 rounded-lg mt-4">
        <input type="text" value="https://www.team87.com" readOnly className="border border-gray-300 p-2 rounded w-full" />
          <div className="flex justify-between items-center bg-white p-4 rounded shadow">
                     
            {/* <img src="profile-pic.png" alt="Profile" className="w-8 h-8 rounded-full ml-2" /> */}
            

            <p className="text-3xl font-bold text-center">Search     </p>
            <input type="text" placeholder="Message" className="border border-gray-300 p-2 rounded w-3/4" />
            <button className="bg-gray-400 text-white px-4 py-2 rounded ml-2">Enter</button>
          </div>
          
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-4/5 bg-white p-4 shadow-md rounded-lg flex flex-col h-96">
        <h2 className="text-2xl font-bold mb-2">Chat Room</h2>
        <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50 rounded-lg">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded-lg max-w-xs ${msg.user === 'You' ? 'bg-green-300 self-end ml-auto' : 'bg-gray-300'}}`}>
              <strong>{msg.user}: </strong>{msg.text}
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="text"
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>

      {/* Database Section */}
      <div className="w-4/5 p-4 my-4">
        <h2 className="text-2xl font-bold">Database</h2>
        <div className="mt-4 space-y-4">
          <div className="p-4 border border-gray-300 rounded-lg bg-white">
            <h3 className="font-semibold">What is Newtons law?</h3>
            <p className="text-sm">Newtons laws of motion are three fundamental principles...</p>
            <div className="flex space-x-2 mt-2">
            <button>👍  100</button>
              <button>💬  100</button>
              <button>🔗 100</button>
            </div>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg bg-white">
            <h3 className="font-semibold">What is Law of Demand?</h3>
            <p className="text-sm">The Law of Demand describes the relationship between price...</p>
            <div className="flex space-x-2 mt-2">
              <button>👍  100</button>
              <button>💬  100</button>
              <button>🔗 100</button>
           </div>
          </div>

          <div className="p-4 border border-gray-300 rounded-lg bg-white">
            <h3 className="font-semibold">What components make up a phone?</h3>
            <p className="text-sm">A phone consists of multiple components...</p>
            <div className="flex space-x-2 mt-2">
              <button>👍  100</button>
              <button>💬  100</button>
              <button>🔗 100</button>
           </div>
          </div>

          <div className="p-4 border border-gray-300 rounded-lg bg-white">
            <p className="text-sm">What is a class?</p>
            <div className="bg-gray-200 p-2 rounded mt-2">
              <p>A class is a fundamental concept in object-oriented programming (OOP)...</p>
              <div className="flex space-x-2 mt-2">
              <button>👍  100</button>
              <button>💬  100</button>
              <button>🔗 100</button>
           </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;


// import React from 'react';

// const App = () => {
//   return (
//     <div className="flex flex-col items-center space-y-4 p-4">
//       {/* Navigation Bar */}
//       <div className="w-4/5 border p-4">
//         <h1 className="text-center text-2xl font-bold">Homepage</h1>
//       </div>

//       {/* Chat Section */}
//       <div className="w-4/5 border p-4">
//         <div className="bg-gray-200 p-2 rounded">
//           <p><strong>What is a class?</strong></p>
//           <p className="bg-purple-200 p-2 rounded mt-2">
//             A class is a fundamental concept in object-oriented programming (OOP) that serves as a blueprint for creating objects. It defines the structure and behavior of objects by encapsulating data (attributes) and functions (methods) that operate on the data.
//           </p>
//         </div>
//       </div>

//       {/* Message Input Section */}
//       <div className="w-4/5 border p-4">
//         <input type="text" placeholder="Message" className="border p-2 w-4/5" />
//         <button className="bg-gray-400 p-2 ml-2">Enter</button>
//       </div>

//       {/* Database Section */}
//       <div className="w-4/5 border p-4">
//         <h2 className="text-xl font-bold">Database</h2>

//         <div className="border p-4 mt-4">
//           <h3 className="font-bold">What is Newton’s law?</h3>
//           <p>
//             Newton's laws of motion are three fundamental principles that form the basis of classical mechanics, describing the relationship between the motion of an object and the forces acting upon it.
//           </p>
//           <div className="flex space-x-2 mt-2">
//             <button>100</button>
//             <button>100</button>
//             <button>100</button>
//           </div>
//         </div>

//         <div className="border p-4 mt-4">
//           <h3 className="font-bold">What is Law of Demand?</h3>
//           <p>
//             The Law of Demand is a fundamental principle in economics that describes the relationship between the price of a good or service and the quantity demanded by consumers.
//           </p>
//           <div className="flex space-x-2 mt-2">
//             <button>100</button>
//             <button>100</button>
//             <button>100</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
