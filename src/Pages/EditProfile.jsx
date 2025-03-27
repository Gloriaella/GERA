
import React, { useState, useContext } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Auth from "../Context/context";
import { account } from "../Appwrite/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { user, setUser } = useContext(Auth);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState(""); // Required for Appwrite email/password updates
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const toggleOldPasswordVisibility = () => setShowOldPassword(!showOldPassword);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // 1️⃣ Update Name (if changed)
      if (name !== user.name) {
        await account.updateName(name);
      }

      // 2️⃣ Update Email (requires current password)
      if (email !== user.email) {
        if (!oldPassword) {
          setMessage("Enter your current password to update email.");
          return;
        }
        await account.updateEmail(email, oldPassword);
      }

      // 3️⃣ Update Password (requires current password)
      if (password) {
        if (password !== confirmPassword) {
          setMessage("Passwords do not match!");
          return;
        }
        if (password.length < 8) {
          setMessage("Password must be at least 8 characters.");
          return;
        }
        if (!oldPassword) {
          setMessage("Enter your current password to update password.");
          return;
        }
        await account.updatePassword(password, oldPassword);
      }

      // ✅ Update user state
      setUser({ ...user, name, email });
      toast.success("Profile updated successfully!");
      setMessage("Profile updated successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("Update error:", error);
      setMessage(error.message || "Failed to update profile.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pb-16 bg-orange-200">
      <div className="max-w-sm w-full bg-white shadow-xl rounded-lg p-6 mt-4">
        <h2 className="text-3xl text-orange-600 font-bold mb-6 text-center">
          EDIT PROFILE
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">Name</label>
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
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-orange-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Old Password Field (Required for email/password update) */}
          <div className="relative">
            <label className="block text-gray-700 text-sm mb-1">Current Password</label>
            <input
              type={showOldPassword ? "text" : "password"}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-orange-600"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 top-7 flex items-center text-gray-500"
              onClick={toggleOldPasswordVisibility}
            >
              {showOldPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>
          </div>

          {/* New Password Field */}
          <div className="relative">
            <label className="block text-gray-700 text-sm mb-1">New Password</label>
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
              {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label className="block text-gray-700 text-sm mb-1">Confirm New Password</label>
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
              {showConfirmPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
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
          {message && <p className="text-center text-sm text-red-500 mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;


