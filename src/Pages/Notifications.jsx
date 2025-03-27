import { useState, useEffect, useContext } from "react";
import { databases } from "../Appwrite/client";
import Auth from "../Context/context";
import { FiTrash2 } from "react-icons/fi"; // Trash icon for delete
import { Query } from "appwrite";
import { toast } from "react-toastify";

const Notifications = () => {
  const { user } = useContext(Auth);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);

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

  const handleDeleteConfirm = (notificationId) => {
    setNotificationToDelete(notificationId);
    setShowConfirmModal(true);
    
  };

  const handleDelete = async () => {
    if (!notificationToDelete) return;
    try {
      await databases.deleteDocument(
        "67d4f0f2003cbfbe2a79", // Your database ID
        "67da45a400070c049632", // Your notifications collection ID
        notificationToDelete
      );
      setNotifications((prev) =>
        prev.filter((notification) => notification.$id !== notificationToDelete)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    } finally {
      setShowConfirmModal(false);
      setNotificationToDelete(null);
      toast.success("Notification deleted successfully!");
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
                onClick={() => handleDeleteConfirm(notification.$id)}
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Delete Notification"
              >
                <FiTrash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this notification?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;





