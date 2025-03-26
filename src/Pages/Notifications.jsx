import { useState, useEffect, useContext } from "react";
import { databases } from "../Appwrite/client";
import Auth from "../Context/context";
import { FiTrash2 } from "react-icons/fi"; // Trash icon for delete
import { Query } from "appwrite";

const Notifications = () => {
  const { user } = useContext(Auth);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await databases.listDocuments(
        "67d4f0f2003cbfbe2a79", // Your database ID
        "67da45a400070c049632", // Your notifications collection ID
        [Query.equal("userId", user.$id)]
      );
      console.log("Fetched notifications:", response.documents);
      // Sort notifications in descending order by createdAt (newest on top)
      const sorted = response.documents.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNotifications(sorted);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      // Delete the document from Appwrite
      await databases.deleteDocument(
        "67d4f0f2003cbfbe2a79", // Your database ID
        "67da45a400070c049632", // Your notifications collection ID
        notificationId
      );
      // Remove the notification from the state
      setNotifications((prev) =>
        prev.filter((notification) => notification.$id !== notificationId)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="loaderanalytics"></p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-orange-600">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-600">No notifications found.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.$id}
              className="bg-orange-200 text-black font-medium p-4 rounded-2xl shadow-md flex justify-between items-center hover:shadow-lg transition-shadow duration-200"
            >
              <div>
                <p>{notification.message}</p>
                <p className="text-xs text-gray-500">
                  Created At: {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(notification.$id)}
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Delete Notification"
              >
                <FiTrash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;





