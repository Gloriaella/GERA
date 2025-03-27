import React, { useState, useEffect } from 'react';
import Auth from "./context";
import { account } from '../Appwrite/client';

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Add theme state: initialize from localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  console.log(user);

  useEffect(() => {
    // Simulate fetching user from localStorage or API
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Update localStorage and document body class when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  

  // Function for sign-up
  const signup = async ({ name, email, password }) => {
    const response = await account.create("unique()", email, password, name);
    console.log(response);
    return response;
  };

  // Function for sign-in
  const signIn = async ({ email, password }) => {
    await account.createEmailPasswordSession(email, password);
    const userData = await account.get();
    setUser(userData);
    console.log(userData);
    sessionStorage.setItem("currentUser", JSON.stringify(userData.$id));
  };

  // Logout function
  const logout = async () => {
    try {
      await account.deleteSession("current");
      sessionStorage.removeItem("currentUser");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Auth.Provider value={{
      signup,
      signIn,
      logout,
      user,
      setUser
    }}>
      {children}
    </Auth.Provider>
  );
};

export default AuthContext;

