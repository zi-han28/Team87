// components/UserContext.js
"use client";
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();
//set default user global stauts
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    user_id: null,
    user_username: null,
    user_email: null,
  });
// wrap user global status 
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);