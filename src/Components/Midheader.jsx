import React from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/Black and White Automotive Logo.png";
import { FaRegUser } from "react-icons/fa6";
import { PiShoppingCart } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { useGlobalContext } from '../context/GlobalState';


const Midheader = () => {
  const { wishlistItems, cartItems } = useGlobalContext();
  console.log(wishlistItems, cartItems);

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
    <div className="bg-white md:border-b md:border-gray-200 lg:border-none">
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
            <Link to="/signup">
              <FaRegUser className="text-2xl text-black" />
            </Link>

            <Link to="/wishlist">
              {renderIconWithBadge(FaRegHeart, wishlistItems.length)}
            </Link>

            <Link to="/addtocart">
              {renderIconWithBadge(PiShoppingCart, cartItems.length)}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center gap-3 py-6 border-b border-gray-300 w-11/12 mx-auto">
        <Link to="/">
          <img className="h-24 w-auto min-w-[50px]" src={logo} alt="Logo" />
        </Link>

        <div className="w-full mx-auto flex items-center pt-4">
          <div className="relative w-full">
            <input
              className="w-full pl-4 pr-10 py-3 text-sm text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none"
              type="text"
              placeholder="Search Our Blog"
            />
            <IoSearchSharp className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg cursor-pointer hover:text-blue-500 transition-colors duration-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Midheader;
