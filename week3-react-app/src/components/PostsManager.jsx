import React, { useEffect, useState } from "react";
import Button from "./Button";

const PostsManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const POSTS_PER_PAGE = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${POSTS_PER_PAGE}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        // Append new posts for pagination
        setPosts((prev) => [...prev, ...data]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  // Filtered posts based on search
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">API Posts Manager</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search posts by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-6 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Error handling */}
      {error && (
        <p className="text-red-500 dark:text-red-400 text-center mb-4">
          {error}
        </p>
      )}

      {/* Loading indicator */}
      {loading && <p className="text-blue-500 text-center mb-4">Loading...</p>}

      {/* Posts grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="border p-4 rounded-lg hover:shadow-md transition dark:border-gray-700"
          >
            <h3 className="font-semibold text-lg mb-2 dark:text-gray-200">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{post.body}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="text-center mt-6">
        <Button
          variant="primary"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </Button>
      </div>
    </div>
  );
};

export default PostsManager;
