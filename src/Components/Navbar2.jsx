
import { useState, useContext, useEffect, useRef } from "react";
import { FiSearch, FiBell, FiSettings, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Auth from "../Context/context";
import { databases } from "../Appwrite/client";
import { Query } from "appwrite";
import { toast } from "react-toastify";

const Navbar2 = ({ isSidebarOpen, onMenuClick }) => {
  const { user } = useContext(Auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationsList, setNotificationsList] = useState([]);
  // lastRead holds a timestamp (milliseconds) when notifications were last marked as read.
  const [lastRead, setLastRead] = useState(Date.now());
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const navigate = useNavigate();

  const settingsRef = useRef(null);
  const searchRef = useRef(null);

  const { logout } = useContext(Auth); // Get logout function

  const handleLogout = () => {
    setShowSettings(false); // Close the dropdown
    toast.success("Logout Successful!")
    setTimeout(() => {
      logout(); // Call the logout function from AuthContext
      navigate("/"); // Redirect to landing page
    }, 3000); // Delay for 3 seconds (adjust as needed)
  };

  // Fetch notifications for the logged-in user from the notifications collection.
  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const response = await databases.listDocuments(
        "67d4f0f2003cbfbe2a79",      // Your database ID
        "67da45a400070c049632",       // Notifications collection ID
        [Query.equal("userId", user.$id)]
      );
      console.log("Fetched notifications:", response.documents);
      setNotificationsList(response.documents);
    } catch (error) {
      console.error("Error fetching notifications in Navbar:", error);
    }
  };

  // Update the indicator: show if there is any notification with createdAt greater than lastRead.
  useEffect(() => {
    const newCount = notificationsList.filter((n) => {
      const notifTime = new Date(n.createdAt).getTime();
      return notifTime > lastRead;
    }).length;
    console.log("New notifications count:", newCount);
    setHasNewNotifications(newCount > 0);
  }, [notificationsList, lastRead]);

  // Poll notifications every 10 seconds.
  useEffect(() => {
    if (!user) return;
    fetchNotifications();
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 10000); // Poll every 10 seconds
    return () => clearInterval(intervalId);
  }, [user]);

  // Handle click outside for settings and search.
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (settingsRef.current && !settingsRef.current.contains(event.target)) {
  //       setShowSettings(false);
  //     }
  //     if (searchRef.current && !searchRef.current.contains(event.target)) {
  //       setShowSearch(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  // When the notification bell is clicked, update lastRead and navigate to the notifications page.
  const handleNotificationClick = () => {
    // Update lastRead to current time so existing notifications are considered read.
    const now = Date.now();
    console.log("Notification bell clicked, setting lastRead to:", now);
    setLastRead(now);
    // Manually clear the new notifications indicator
    setHasNewNotifications(false);
    navigate("/dashboard/notifications");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md w-full fixed top-0 z-30 left-0 right-0 h-16">
      {/* Left: Hamburger Menu + Logo */}
      <div className="flex items-center">
        <span className="text-4xl font-bold text-orange-700">GERA</span>
        <div className="pl-7 font-bold md:text-lg text-md mt-2">
          <span className="text-orange-700">
            {user ? `Hello, ${user.name}` : "Hello"}
          </span>
        </div>
      </div>

      {/* Middle: Search Bar */}
      {/* <div
        ref={searchRef}
        className={`relative w-96 max-w-full ${showSearch ? "block" : "hidden"} md:flex`}
      >
        <FiSearch className="absolute left-2 top-3 text-black" size={20} />
        <input
          type="text"
          placeholder="Search tasks..."
          className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div> */}

      {/* Right: Notifications, Search (Mobile), and Settings */}
      <div className="flex items-center space-x-1">
        {/* Search Button (Mobile) */}
        <button className="md:hidden" onClick={() => setShowSearch(!showSearch)}>
          <FiSearch size={24} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 bg-transparent" onClick={handleNotificationClick}>
            <div className="relative">
              <FiBell size={22} />
              {hasNewNotifications && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
              )}
            </div>
          </button>
        </div>

        {/* Settings Dropdown */}
        <div ref={settingsRef} className="relative">
          <button className="p-2 bg-transparent" onClick={() => setShowSettings(!showSettings)}>
            <FiSettings size={22} />
          </button>
          {showSettings && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
              <button
                className="flex items-center w-full p-2 hover:bg-gray-100"
                onClick={() => navigate("/dashboard/profile")}
              >
                <FiUser className="mr-2" /> Profile
              </button>
              <button
                className="flex items-center w-full p-2 hover:bg-gray-100 text-red-600"
                onClick={handleLogout}
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
        <button
          className="md:hidden text-black text-2xl focus:outline-none mr-1"
          onClick={onMenuClick}
        >
          {isSidebarOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar2;
