import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger & close icon

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600 transition";

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        
        {/* Logo / Title */}
        <NavLink to="/" className="text-2xl font-bold text-blue-600">
          Smart Expense Tracker
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-base">
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/expenseslist" className={linkClass}>
            Expenses
          </NavLink>
          <NavLink to="/incomeslist" className={linkClass}>
            Income
          </NavLink>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <NavLink
            to="/"
            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/expenseslist"
            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Expenses
          </NavLink>
          <NavLink
            to="/incomeslist"
            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Income
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
