import React from "react";
// import { IoSearchSharp } from "react-icons/io5";

const LeftBlog = ({ blogCategories, selectedCategories, handleCheckboxChange }) => {
  return (
    <div className="w-full mt-5 ">
      {/* <div className="relative mb-8">
        <input
          className="w-full pl-4 pr-10 py-3 text-sm text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none"
          type="text"
          placeholder="Search Our Blog"
        />
        <IoSearchSharp className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg cursor-pointer hover:text-blue-500 transition-colors duration-200" />
      </div> */}

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <h3 className="text-lg font-semibold text-gray-800 bg-gray-50 px-6 py-4 border-b border-gray-200">
          Categories
        </h3>
        <div className="flex flex-col gap-2 p-4">
          {blogCategories.map((category) => (
            <div
              key={category.id}
              className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-600 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              onClick={() => handleCheckboxChange(category.name)}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.name)}
                onChange={() => handleCheckboxChange(category.name)}
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
              />
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftBlog;