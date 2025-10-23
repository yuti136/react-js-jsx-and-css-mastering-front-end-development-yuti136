import React from 'react';
import Button from './Button';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          PLP Task Manager
        </h1>

        <div className="flex gap-3">
          <Button variant="primary" size="sm">Home</Button>
          <Button variant="secondary" size="sm">About</Button>
          <Button variant="danger" size="sm">Logout</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
