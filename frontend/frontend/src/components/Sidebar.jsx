import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navLinkStyles = ({ isActive }) =>
    isActive
      ? "block px-4 py-2 rounded bg-emerald-600 text-white"
      : "block px-4 py-2 rounded hover:bg-teal-100 text-gray-800";

  return (
    <aside className="w-60 bg-white shadow-md p-4 border-r border-gray-200">
      <h2 className="text-xl font-bold text-emerald-700 mb-4">Menu</h2>
      <nav className="space-y-2">
        <NavLink to="/" className={navLinkStyles}>Dashboard</NavLink>
        <NavLink to="/income" className={navLinkStyles}>Income</NavLink>
        <NavLink to="/expenses" className={navLinkStyles}>Expenses</NavLink>
        <NavLink to="/savings" className={navLinkStyles}>Savings</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
