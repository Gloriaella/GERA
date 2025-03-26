// import React, { useState, useEffect } from "react";
// import { FiX } from "react-icons/fi";
// import { databases } from "../Appwrite/client"; // Appwrite client setup

// const Workflows = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [filteredTasks, setFilteredTasks] = useState([]);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   useEffect(() => {
//     // Filter tasks when a status is selected
//     if (selectedStatus) {
//       setFilteredTasks(tasks.filter(task => task.status === selectedStatus));
//     } else {
//       setFilteredTasks([]);
//     }
//   }, [selectedStatus, tasks]);

//   const fetchTasks = async () => {
//     try {
//       const response = await databases.listDocuments(
//         "67d4f0f2003cbfbe2a79",
//         "67d4f19d0036525e7044"
//       );
//       setTasks(response.documents);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Upcoming deadlines: sort tasks by deadline and take the first three upcoming
//   const upcomingDeadlines = tasks
//     .filter(task => new Date(task.deadline) >= new Date())
//     .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
//     .slice(0, 3);

//   // Calculate progress percentage safely
//   const doneCount = tasks.filter(t => t.status === "Done").length;
//   const progressPercentage = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;

//   const handleStatusClick = (status) => {
//     setSelectedStatus(status);
//   };

//   const closeModal = () => {
//     setSelectedStatus("");
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {loading && <p>Loading tasks...</p>}

//       {/* Top Section: Overview Widgets */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="p-4 border rounded-lg shadow-md bg-white">
//           <h3 className="text-lg font-semibold">Total Tasks</h3>
//           <p className="text-2xl">{tasks.length}</p>
//         </div>
//         <div className="p-4 border rounded-lg shadow-md bg-white">
//           <h3 className="text-lg font-semibold">Progress</h3>
//           <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
//             <div
//               className="h-2 bg-orange-500 rounded-full transition-all duration-500"
//               style={{ width: `${progressPercentage}%` }}
//             ></div>
//           </div>
//           <p className="mt-1 text-sm text-gray-600">{progressPercentage}% completed</p>
//         </div>
//         <div className="p-4 border rounded-lg shadow-md bg-white">
//           <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
//           <ul className="text-sm text-gray-600">
//             {upcomingDeadlines.length > 0 ? (
//               upcomingDeadlines.map(task => (
//                 <li key={task.$id} className="mt-1">
//                   {task.title} - {new Date(task.deadline).toLocaleString()}
//                 </li>
//               ))
//             ) : (
//               <li>No upcoming deadlines</li>
//             )}
//           </ul>
//         </div>
//       </div>

//       {/* Main Section: Task Flowchart */}
//       <div className="p-4 border rounded-lg shadow-md bg-white">
//         <h2 className="text-xl font-bold mb-4">Task Flow</h2>
//         <div className="flex items-center justify-between space-x-4 overflow-x-auto p-4">
//           {["Backlog", "Pending", "Todo", "Doing", "Done"].map((status, index) => (
//             <div
//               key={status}
//               className="flex flex-col items-center cursor-pointer"
//               onClick={() => handleStatusClick(status)}
//             >
//               <div className="w-24 h-24 flex items-center justify-center rounded-full bg-orange-600 text-white font-semibold shadow-md transform hover:scale-115 transition-transform duration-200">
//                 {status}
//               </div>
//               {index < 4 && <div className="h-1 w-16 bg-gray-400 mt-2"></div>}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal: Display tasks for the selected status */}
//       {selectedStatus && (
//         <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 z-50">
//           <div className="bg-orange-200 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
//             <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
//               <FiX size={24} />
//             </button>
//             <h2 className="text-2xl font-bold mb-4">{selectedStatus} Tasks</h2>
//             {filteredTasks.length > 0 ? (
//               <ul className="space-y-3 max-h-80 overflow-y-auto">
//                 {filteredTasks.map(task => (
//                   <li key={task.$id} className="p-3 border rounded shadow-sm">
//                     <h3 className="font-semibold">{task.title}</h3>
//                     <p className="text-sm text-gray-600">{task.description}</p>
//                     <p className="text-xs text-gray-500">
//                       Deadline: {new Date(task.deadline).toLocaleString()}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No tasks in this category.</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Workflows;


import React, { useState, useEffect, useContext } from "react";
import { FiX } from "react-icons/fi";
import { databases } from "../Appwrite/client"; // Ensure Query is imported
import Auth from "../Context/context";
import { Query } from "appwrite";

const WorkFlows = () => {
  const { user } = useContext(Auth);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Fetch tasks only for the logged-in user
  useEffect(() => {
    if (!user) return;
    fetchTasks();
  }, [user]);

  // Filter tasks when a status is selected
  useEffect(() => {
    if (selectedStatus) {
      setFilteredTasks(tasks.filter(task => task.status === selectedStatus));
    } else {
      setFilteredTasks([]);
    }
  }, [selectedStatus, tasks]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        "67d4f0f2003cbfbe2a79", // Replace with your actual database ID
        "67d4f19d0036525e7044", // Replace with your actual collection ID
        [Query.equal("userId", user.$id)]
      );
      setTasks(response.documents);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Upcoming deadlines: sort tasks by deadline and take the first three upcoming tasks
  const upcomingDeadlines = tasks
    .filter(task => new Date(task.deadline) >= new Date())
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  // Calculate progress percentage (using "Done" status as completed)
  const doneCount = tasks.filter(t => t.status === "Done").length;
  const progressPercentage = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };

  const closeModal = () => {
    setSelectedStatus("");
  };

  return (
    <div className="p-6 space-y-6">
      {loading && <p></p>}

      {/* Top Section: Overview Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h3 className="text-lg font-semibold">Total Tasks</h3>
          <p className="text-2xl">{tasks.length}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h3 className="text-lg font-semibold">Progress</h3>
          <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
            <div
              className="h-2 bg-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="mt-1 text-sm text-gray-600">{progressPercentage}% completed</p>
        </div>
        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
          <ul className="text-sm text-gray-600">
            {upcomingDeadlines.length > 0 ? (
              upcomingDeadlines.map(task => (
                <li key={task.$id} className="mt-1">
                  {task.title} - {new Date(task.deadline).toLocaleString()}
                </li>
              ))
            ) : (
              <li>No upcoming deadlines</li>
            )}
          </ul>
        </div>
      </div>

      {/* Main Section: Task Flowchart */}
      <div className="p-4 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-bold mb-4">Task Flow</h2>
        <div className="flex items-center justify-between space-x-4 overflow-x-auto p-4">
          {["Backlog", "Pending", "Todo", "Doing", "Done"].map((status, index) => (
            <div
              key={status}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleStatusClick(status)}
            >
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-orange-600 text-white font-semibold shadow-md transform hover:scale-110 transition-transform duration-200">
                {status}
              </div>
              {index < 4 && <div className="h-1 w-16 bg-gray-400 mt-2"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Display tasks for the selected status */}
      {selectedStatus && (
        <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm bg-opacity-50 z-50">
          <div className="bg-orange-200 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedStatus} Tasks</h2>
            {filteredTasks.length > 0 ? (
              <ul className="space-y-3 max-h-80 overflow-y-auto">
                {filteredTasks.map(task => (
                  <li key={task.$id} className="p-3 border rounded shadow-sm bg-white">
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-xs text-gray-500">
                      Deadline: {new Date(task.deadline).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tasks in this category.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkFlows;
