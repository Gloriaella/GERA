
import { useState, useEffect, useContext } from "react";
import { FiPlusCircle, FiTrash } from "react-icons/fi";
import { databases } from "../Appwrite/client";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Auth from "../Context/context";
import { Query } from "appwrite";
import { toast } from "react-toastify";

const Boards = () => {
  const { user } = useContext(Auth);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ 
    title: "", 
    description: "", 
    status: "", 
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
  });

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      // Fetch tasks filtered only by userId.
      const response = await databases.listDocuments(
        "67d4f0f2003cbfbe2a79", // Database ID
        "67d4f19d0036525e7044", // Tasks collection ID
        [
          Query.equal("userId", user?.$id)
        ]
      );
      console.log("Fetched tasks:", response.documents);
      setTasks([...response.documents]);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addNotification = async (message) => {
    if (!user) {
      console.error("User not logged in. Cannot add notification.");
      return;
    }
    try {
      const response = await databases.createDocument(
        "67d4f0f2003cbfbe2a79",
        "67da45a400070c049632", // Notifications collection ID
        "unique()",
        {
          userId: user.$id,
          message,
          createdAt: new Date().toISOString()
        }
      );
      console.log("Notification created:", response);
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  const handleAddTask = async () => {
    if (!user) {
      console.error("User not logged in. Cannot add task.");
      return;
    }
    if (!newTask.title.trim()) return;

    const created_at = new Date().toISOString();
    const updated_at = created_at;

    // Combine end_date and end_time to form the deadline attribute
    const deadline = new Date(`${newTask.end_date}T${newTask.end_time}`).toISOString();

    // Build the task document (no projectId)
    const taskToAdd = {
      ...newTask,
      deadline,
      status: selectedStatus,
      userId: user.$id,
      created_at,
      updated_at
    };

    try {
      const res = await databases.createDocument(
        "67d4f0f2003cbfbe2a79",
        "67d4f19d0036525e7044",
        "unique()",
        taskToAdd
      );
      console.log("Task created:", res);
      fetchTasks();
      // Reset the new task state after creation
      setNewTask({ 
        title: "", 
        description: "", 
        status: "", 
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: ""
      });
      setShowAddTaskModal(false);
      await addNotification(`Task '${taskToAdd.title}' added to ${selectedStatus}.`);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId, taskTitle) => {
    try {
      await databases.deleteDocument(
        "67d4f0f2003cbfbe2a79",
        "67d4f19d0036525e7044",
        taskId
      );
      console.log(`Deleted task ${taskId}`);
      fetchTasks();
      await addNotification(`Task '${taskTitle}' deleted.`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    toast.success("Task deleted successfully!");
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const updatedTasks = tasks.map(task => {
      if (task.$id === result.draggableId) {
        return { ...task, status: result.destination.droppableId };
      }
      return task;
    });
    setTasks(updatedTasks);

    try {
      await databases.updateDocument(
        "67d4f0f2003cbfbe2a79",
        "67d4f19d0036525e7044",
        result.draggableId,
        { status: result.destination.droppableId }
      );
      await addNotification(`Task moved to '${result.destination.droppableId}'.`);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 text-center">
          {["Backlog", "Pending", "Todo", "Doing", "Done"].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef} 
                  className="bg-gray-100 p-6 rounded-lg shadow-md min-h-[300px] relative"
                >
                  <h2 className="text-lg font-bold text-gray-700 mb-2">{status}</h2>
                  <div className="space-y-2">
                    {tasks.filter(task => task.status === status).map((task, index) => (
                      <Draggable key={task.$id} draggableId={task.$id} index={index}>
                        {(provided) => (
                          <div 
                            ref={provided.innerRef} 
                            {...provided.draggableProps} 
                            {...provided.dragHandleProps} 
                            className="bg-white p-3 rounded-lg shadow flex justify-between items-center"
                          >
                            <div className="w-full">
                              <div className="flex justify-between">
                                <h3 className="font-bold w-1/2">{task.title}</h3>
                                <p className="text-sm w-1/2">{task.description}</p>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <p>Start: {task.start_date} {task.start_time}</p>
                                <p>End: {task.end_date} {task.end_time}</p>
                              </div>
                            </div>
                            <FiTrash 
                              className="text-red-500 cursor-pointer" 
                              onClick={() => handleDeleteTask(task.$id, task.title)} 
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                  <button 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-orange-600 font-bold text-white px-2 py-1 rounded-md shadow-md hover:bg-orange-700 transition text-sm w-full" 
                    onClick={() => {
                      setSelectedStatus(status); 
                      setShowAddTaskModal(true);
                    }}
                  >
                    <FiPlusCircle size={16} className="mr-1" /> Add Task
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      
      {showAddTaskModal && (
        <div className="fixed inset-0 flex mt-10 items-center justify-center backdrop-blur-xs">
          <div className="bg-orange-200 p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-3xl text-orange-600 font-bold mb-4 text-center">Add Task</h2>
            <p className="mb-4">
              Status: <span className="font-semibold">{selectedStatus}</span>
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={newTask.start_date}
                  onChange={(e) => setNewTask({ ...newTask, start_date: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={newTask.end_date}
                  onChange={(e) => setNewTask({ ...newTask, end_date: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  value={newTask.start_time}
                  onChange={(e) => setNewTask({ ...newTask, start_time: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="time"
                  value={newTask.end_time}
                  onChange={(e) => setNewTask({ ...newTask, end_time: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <button
                onClick={handleAddTask}
                className="bg-orange-600 text-white text-sm px-4 py-2 rounded-full shadow font-bold hover:bg-orange-500"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="ml-2 bg-gray-400 text-white rounded-full text-sm font-bold px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Boards;
