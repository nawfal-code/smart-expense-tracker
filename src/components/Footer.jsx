import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t py-4 mt-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Smart Expense Tracker
        </p>
      </div>
    </footer>
  );
};

export default Footer;
