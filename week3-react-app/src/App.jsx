import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TaskManager from "./components/TaskManager";
import PostsManager from "./components/PostsManager";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Main content area */}
        <main className="flex-grow container mx-auto p-6 space-y-8">
          <TaskManager />  {/* Task Management from Task 3 */}
          <PostsManager /> {/* API Integration from Task 4 */}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
