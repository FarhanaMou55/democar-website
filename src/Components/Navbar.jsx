import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch categories data from public directory (fixed the fetch path)
  useEffect(() => {
    fetch("/src/pages/products/Products.json") // Ensure Products.json is inside the 'public/data' folder
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = [
          ...new Set(
            data.map(
              (product) => product.category || product.productDisplayCategory
            )
          ),
        ];
        setCategories(uniqueCategories.filter(Boolean));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]); // Fallback in case of an error (empty categories list)
      });
  }, []);

  // Handle closing the dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="bg-white border-t border-b border-gray-200 hidden lg:block ">
        <div className="flex justify-between items-center w-11/12 md:w-10/12 mx-auto py-2">
          <div className="flex items-center gap-10">
            <div className="relative" ref={dropdownRef}>
              <div
                tabIndex={0}
                role="button"
                className="btn bg-[#ff0000] border-none text-white px-4 py-7 rounded-md hover:bg-black transition duration-300 cursor-pointer flex gap-10"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
              >
                <RiMenu2Fill className="font-bold text-xl" />
                <p>Shop By Categories</p>
                <MdOutlineKeyboardArrowDown className="font-bold text-xl" />
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu absolute rounded-box z-50 w-52 p-2 shadow-sm text-gray-600 bg-white"
                >
                  <li>
                    <Link
                      to="/products"
                      className="cursor-pointer"
                      onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                    >
                      All Products
                    </Link>
                  </li>
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <li key={index}>
                        <Link
                          to={`/products?category=${encodeURIComponent(category)}`}
                          className="cursor-pointer"
                          onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                        >
                          {category}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>
                      <p className="text-gray-500">No Categories Available</p>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>

          <div className="navbar-center hidden lg:flex lg:justify-between">
            <ul className="menu menu-horizontal px-1 gap-6 text-black font-bold text-[16px]">
              <Link to="/" className="cursor-pointer">Home</Link>
              <Link to="/products" className="cursor-pointer">Products</Link>
              <Link to="/blogs" className="cursor-pointer">Blog</Link>
              <Link to="/about" className="cursor-pointer">About</Link>

            </ul>
          </div>
          <div className='btn bg-[#ff0000] border-none text-white px-4 py-5 rounded-md hover:bg-black transition duration-300 cursor-pointer flex gap-10'>

            <Link to="/contacts" className="cursor-pointer">Contact Us</Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
