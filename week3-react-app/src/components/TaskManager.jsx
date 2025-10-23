import React, { useState } from "react";
import Button from "./Button";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useTheme } from "../context/ThemeContext";

/**
 * TaskManager Component — handles all CRUD and filtering logic
 */
const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [newTaskText, setNewTaskText] = useState("");
  const [filter, setFilter] = useState("all");
  const { theme, toggleTheme } = useTheme();

  // Add new task
  const addTask = (text) => {
    if (text.trim()) {
      const newTask = {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTaskText);
    setNewTaskText("");
  };

  // Toggle completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-500 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">📝 Task Manager</h2>
          <Button
            onClick={toggleTheme}
            variant="secondary"
            size="sm"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
          </Button>
        </div>

        {/* Task Input */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Add a new task..."
              className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <Button type="submit" variant="primary">
              Add Task
            </Button>
          </div>
        </form>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={filter === "all" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "active" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setFilter("active")}
          >
            Active
          </Button>
          <Button
            variant={filter === "completed" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>
        </div>

        {/* Task List */}
        <ul className="space-y-2">
          {filteredTasks.length === 0 ? (
            <li className="text-gray-500 dark:text-gray-400 text-center py-4">
              No tasks found
            </li>
          ) : (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700 transition"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span
                    className={`${
                      task.completed
                        ? "line-through text-gray-500 dark:text-gray-400"
                        : ""
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </Button>
              </li>
            ))
          )}
        </ul>

        {/* Task Stats */}
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>{tasks.filter((t) => !t.completed).length} tasks remaining</p>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
