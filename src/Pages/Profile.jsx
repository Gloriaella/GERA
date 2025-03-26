import React, { useContext } from 'react';
import Auth from "../Context/context";
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Import user icon from react-icons

const Profile = () => {
  const { user } = useContext(Auth);

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-200 rounded-lg">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-lg p-10 mb-12">
        <div className="flex flex-col items-center">
          {/* User Avatar or Default Icon */}
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="User avatar"
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-orange-600"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-orange-600 mb-4" />
          )}

          {/* User Name */}
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {user?.name || 'Guest'}
          </h2>

          {/* User Email */}
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {user?.email || 'Not available'}
          </p>

          {/* Edit Profile Button */}
          <Link to="/dashboard/EditProfile">
            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full transition-colors">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
