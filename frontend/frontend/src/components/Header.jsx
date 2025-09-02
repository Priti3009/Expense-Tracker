import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);    // for Dropdown menu

  return (
    <header className="bg-emerald-600 text-white shadow-md p-4 flex justify-between items-center relative">
      
      <h1 className="text-2xl font-bold">Expense Tracker</h1>  {/* add logo Later*/}

      {/* User Profile Section */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <img
            src="https://via.placeholder.com/40" // replace with actual user image
            alt="User Profile"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="hidden sm:inline text-sm font-medium">Hi, User</span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (   //if isOpen is true (conditional rendering)
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded-lg shadow-lg overflow-hidden">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
              Profile
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
              Settings
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
