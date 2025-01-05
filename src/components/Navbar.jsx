import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-xl font-bold">
          <NavLink to="/" className="hover:text-blue-200">
            MyApp
          </NavLink>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-200 border-b-2 border-white pb-1"
                : "hover:text-blue-200"
            }
          >
            Create Form
          </NavLink>
          <NavLink
            to="/view"
            className={({ isActive }) =>
              isActive
                ? "text-blue-200 border-b-2 border-white pb-1"
                : "hover:text-blue-200"
            }
          >
            View Comments
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            id="menu-btn"
            className="text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="menu" className="hidden md:hidden bg-blue-700 text-white">
        <NavLink
          to="/"
          className="block px-4 py-2 hover:bg-blue-800"
          onClick={() => document.getElementById("menu").classList.add("hidden")}
        >
          Create Form
        </NavLink>
        <NavLink
          to="/view"
          className="block px-4 py-2 hover:bg-blue-800"
          onClick={() => document.getElementById("menu").classList.add("hidden")}
        >
          View Comments
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
