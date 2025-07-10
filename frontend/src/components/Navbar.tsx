import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const { isAdmin, logout } = useAdmin();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-semibold py-2 text-green-800 tracking-tight"
        >
          Organic
        </Link>
        {/* Hamburger for small screens */}
        <button
          className="sm:hidden flex items-center text-green-900"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        {/* Nav links for large screens */}
        <div className="hidden sm:flex text-sm justify-between items-center w-1/3 ">
          <Link
            to="/"
            className="text-sm flex items-center gap-1 text-black tracking-tight"
          >
            Home
          </Link>
          <Link
            to="/product"
            className="text-sm flex items-center gap-1 text-black tracking-tight"
          >
            Products <ChevronDown size={"15"} />
          </Link>
          <a href="/#about">About</a>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          {isAdmin ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {/* Collapsible menu for small screens */}
      {menuOpen && (
        <div className="sm:hidden absolute w-full text-right bg-green-50 border-b-green-700 border-b px-8 pb-4">
          <div className="flex flex-col gap-2 items-end mb-4">
            <Link
              to="/"
              className="text-xl flex items-center gap-1 text-black tracking-tight"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/product"
              className="text-xl flex items-center gap-1 text-black tracking-tight"
              onClick={() => setMenuOpen(false)}
            >
              <ChevronDown size={"15"} />
              Products
            </Link>
            <a href="#about" className="text-xl" onClick={() => setMenuOpen(false)}>
              About
            </a>
          </div>
          <div className="flex flex-col gap-2 items-end">
            {isAdmin ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="bg-red-600 w-fit text-white px-4 py-2 rounded-full hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-green-700 w-fit text-white px-4 py-2 rounded-full hover:bg-green-800"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
