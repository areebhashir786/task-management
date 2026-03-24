import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance.js";
import { API_ROUTES } from "../api/apiRoutes.js";

const TaskPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  const [editingTask, seteditingTask] = useState(null);

  const token = localStorage.getItem("auth-token");

  const handleLogout = async () => {
    try {
      await api.post(API_ROUTES.AUTH.LOGOUT);
    } catch {
      /* still clear local session */
    }
    localStorage.removeItem("auth-token");
    toast.success("Logged out");
    navigate("/login", { replace: true });
  };

  const fetchAllTasks = useCallback(async () => {
    try {
      const res = await api.get(API_ROUTES.TASK.GET_ALL);
      setTasks(res.data.tasks);
    } catch {
      toast.error("Failed to fetch tasks");
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!token) return;
    const id = requestAnimationFrame(() => {
      void fetchAllTasks();
    });
    return () => cancelAnimationFrame(id);
  }, [token, fetchAllTasks]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await api.post(API_ROUTES.TASK.CREATE, {
        title,
        description,
        status,
        dueDate,
      });

      toast.success("Task created");

      setTitle("");
      setDescription("");
      setStatus("Pending");
      setDueDate("");

      fetchAllTasks();
    } catch {
      toast.error("Error creating task");
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await api.put(API_ROUTES.TASK.UPDATE(editingTask.id), {
        title,
        description,
        status,
        dueDate,
      });

      toast.success("Task updated");

      setTitle("");
      setDescription("");
      setStatus("Pending");
      setDueDate("");
      seteditingTask(null);

      fetchAllTasks();
    } catch {
      toast.error("Error updating task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(API_ROUTES.TASK.DELETE(id));

      toast.success("Task deleted");
      fetchAllTasks();
    } catch {
      toast.error("Error deleting task");
    }
  };

  const startEditing = (task) => {
    seteditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setDueDate(task.dueDate?.slice(0, 10));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-blue-600">Task Manager</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm"
        >
          Logout
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        className="bg-white shadow-lg rounded-xl p-5 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Task title"
          className="border w-full p-2 mb-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task description"
          className="border w-full p-2 mb-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="border w-full p-2 mb-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <input
          type="date"
          className="border w-full p-2 mb-3 rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button className="bg-blue-500 hover:bg-blue-600 text-white w-full p-2 rounded">
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      <div className="mt-6 w-full max-w-md">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white shadow-md rounded-lg p-4 mb-3 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    task.status === "Completed"
                      ? "bg-green-200 text-green-700"
                      : task.status === "In Progress"
                        ? "bg-yellow-200 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {task.status}
                </span>

                <p className="text-xs text-gray-500 mt-1">
                  Due: {task.dueDate?.slice(0, 10) || "N/A"}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => startEditing(task)}
                  className="bg-yellow-400 px-3 py-1 rounded text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskPage;
