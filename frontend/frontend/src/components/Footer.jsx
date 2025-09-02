import React from "react";

const Footer = () => {
  return (
    <footer className="bg-emerald-700 text-gray-100 text-center p-4">
      <p className="text-sm">© {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

