// import React, { useContext, useState, useEffect } from 'react';
// import Auth from '../Context/context';

// const Customization = () => {
//   // Consume theme and setTheme from AuthContext
//   const { theme, setTheme } = useContext(Auth);
//   const [localTheme, setLocalTheme] = useState(theme);

//   // State for accent color (defaulting to Tailwind's blue-500 color)
//   const [accentColor, setAccentColor] = useState(
//     localStorage.getItem('accentColor') || '#3b82f6'
//   );

//   // Toggle theme between light and dark
//   const toggleTheme = () => {
//     const newTheme = localTheme === 'light' ? 'dark' : 'light';
//     setLocalTheme(newTheme);
//     setTheme(newTheme);
//   };

//   // Update localStorage and CSS variable when accentColor changes
//   useEffect(() => {
//     localStorage.setItem('accentColor', accentColor);
//     document.documentElement.style.setProperty('--accent-color', accentColor);
//   }, [accentColor]);

//   return (
//     <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 ">
//       <h2 className="text-2xl font-bold mb-4">Customization</h2>
      
//       {/* Theme Toggle Section */}
//       <div className="mb-6">
//         <p className="mb-2">
//           Current Theme: <strong>{localTheme}</strong>
//         </p>
//         <button
//           onClick={toggleTheme}
//           className="px-4 py-2 text-white rounded hover:opacity-90 transition"
//           style={{ backgroundColor: 'var(--accent-color)' }}
//         >
//           Switch to {localTheme === 'light' ? 'Dark' : 'Light'} Mode
//         </button>
//       </div>
      
//       {/* Accent Color Picker */}
//       <div className="mb-6">
//         <label htmlFor="accent-color" className="block text-sm font-medium text-gray-700 mb-1">
//           Accent Color:
//         </label>
//         <select
//           id="accent-color"
//           value={accentColor}
//           onChange={(e) => setAccentColor(e.target.value)}
//           className="p-2 border rounded"
//         >
//           <option value="#3b82f6">Blue</option>
//           <option value="#ef4444">Red</option>
//           <option value="#10b981">Green</option>
//           <option value="#f59e0b">Yellow</option>
//         </select>
//       </div>
      
//       <p className="text-gray-600">More customization options coming soon...</p>
//     </div>
//   );
// };

// export default Customization;


import React, { useState, useContext } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import Eye icons
import Auth from "../Context/context";
import { account } from "../Appwrite/client"; // Ensure you have Appwrite imported
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, setUser } = useContext(Auth);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validate passwords
    if (password && password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    
    if (password && password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    try {
      // Simulated update for name and email
      const updatedUser = { ...user, name, email };
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUser(updatedUser);

      // If a new password is provided, update in Appwrite
      if (password) {
        await account.update({ password });
      }

      setMessage("Profile updated successfully!");
      setTimeout(() => {
        navigate('/dashboard'); // Change this to your Profile page route
      }, 1500);
      
    } catch (error) {
      console.error(error);
      setMessage("Failed to update profile.");
    }
  };
 
 



  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-200">
      <div className="max-w-sm w-full bg-white shadow-xl rounded-lg p-6 mt-4">
        <h2 className="text-3xl text-orange-600 font-bold mb-6 text-center">
          EDIT PROFILE
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-orange-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-orange-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field with Eye Icon */}
          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-200 mb-1">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-orange-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 top-7 flex items-center text-gray-500"
              onClick={togglePasswordVisibility}
            >
               {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Confirm Password Field with Eye Icon */}
          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-orange-600"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 top-7 flex items-center text-gray-500"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full transition-colors"
          >
            Save Changes
          </button>

          {/* Message */}
          {message && <p className="text-center text-sm text-green-500 mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

