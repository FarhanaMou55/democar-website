import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/Black and White Automotive Logo.png";
import { FaRegUser } from "react-icons/fa6";
import { PiShoppingCart } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { IoSearchSharp, IoMenu, IoClose } from "react-icons/io5";
import { useGlobalContext } from '../context/GlobalState';

import Modal from './login,signup/Modal';
import Login from './login,signup/Login';
import Signup from './login,signup/Signup';

const Midheader = () => {
  const { wishlistItems, cartItems } = useGlobalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const openModal = (mode) => {
    setAuthMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderIconWithBadge = (Icon, count) => (
    <div className="relative">
      <Icon className="text-2xl text-black" />
      {count > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between w-11/12 md:w-10/12 mx-auto gap-10">
        <Link to="/" className="flex-shrink-0">
          <img className="h-28 w-auto min-w-[50px]" src={logo} alt="Logo" />
        </Link>

        {/* Search */}
        <div className="flex items-center lg:ml-10 xl:ml-20">
          <div className="relative w-full md:w-[400px] lg:w-[500px]">
            <input
              className="w-full pl-4 pr-14 py-3 text-sm text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none"
              type="text"
              placeholder="Search Our Blog"
            />
            <div className="absolute right-1 top-1 bottom-1 flex items-center">
              <div className="h-full aspect-square bg-[#ff0000] text-white rounded-md flex items-center justify-center cursor-pointer hover:text-black transition-colors duration-200">
                <IoSearchSharp className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
        {/* Icons */}
        <div className="hidden lg:flex items-center">
          <div className="flex justify-center gap-6">
            <div className="relative group cursor-pointer">
              <FaRegUser className="text-2xl text-black" />
              <ul className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-20 py-2">
                <li>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => openModal("signup")}>Sign Up</button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => openModal("login")}>Login</button>
                </li>
              </ul>
            </div>
            <Link to="/wishlist">{renderIconWithBadge(FaRegHeart, wishlistItems.length)}</Link>
            <Link to="/addtocart">{renderIconWithBadge(PiShoppingCart, cartItems.length)}</Link>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      {/* Top: Logo */}
      <div className="w-full flex justify-center md:hidden py-4">
        <Link to="/" className="flex-shrink-0">
          <img className="h-16 w-auto mx-auto" src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Bottom: Menu and Icons Row */}
      <div className="w-11/12 mx-auto md:hidden flex items-center justify-between">
        {/* Left: Menu */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl text-gray-700">
          {menuOpen ? <IoClose /> : <IoMenu />}
        </button>

        {/* Right: Icons */}
        <div className="md:hidden mb-5 flex items-center gap-3 relative z-50">
          {/* USER Dropdown Toggle */}
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="relative"
          >
            <FaRegUser className="text-2xl text-black" />
          </button>

          {/* Wishlist Icon with Badge */}
          <Link to="/wishlist">{renderIconWithBadge(FaRegHeart, wishlistItems.length)}</Link>

          {/* Cart Icon with Badge */}
          <Link to="/addtocart">{renderIconWithBadge(PiShoppingCart, cartItems.length)}</Link>

          {/* Dropdown Menu */}
          {userDropdownOpen && (
            <ul className="absolute top-10 right-0 w-32 bg-white shadow-md rounded-md z-50 py-2">
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    setAuthMode("signup");
                    setIsModalOpen(true);
                  }}
                >
                  Sign Up
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    setAuthMode("login");
                    setIsModalOpen(true);
                  }}
                >
                  Login
                </button>
              </li>
            </ul>
          )}
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-3 py-6 border-t border-gray-300 w-11/12 mx-auto">
          <ul className="flex flex-col gap-4 text-center text-black font-semibold text-lg">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contacts" onClick={() => setMenuOpen(false)} className="text-white bg-red-600 px-4 py-2 rounded hover:bg-black">
              Contact Us
            </Link>
          </ul>

        </div>
      )}

      {/* Auth Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {authMode === "login" ? (
          <Login switchToSignup={() => setAuthMode("signup")} />
        ) : (
          <Signup switchToLogin={() => setAuthMode("login")} />
        )}
      </Modal>
    </div>
  );
};

export default Midheader;
