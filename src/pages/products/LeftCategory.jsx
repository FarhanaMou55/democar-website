import React, { useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

const LeftCategory = ({
  productCategories,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    if (categoryParam) {
      const decodedCategory = decodeURIComponent(categoryParam);
      if (!selectedCategories.includes(decodedCategory)) {
        setSelectedCategories([decodedCategory]); // 👈 make sure to set only the current category
      }
    } else {
      setSelectedCategories([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryParam]);

  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };


  return (
    <div>
      {/* Optional Search Input
      <div className="relative mb-8">
        <input
          className="w-full pl-4 pr-10 py-3 text-sm text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          type="text"
          placeholder="Search Categories"
        />
        <IoSearchSharp className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg cursor-pointer hover:text-blue-500 transition-colors duration-200" />
      </div> */}

      <div className="bg-white  border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <h3 className="text-lg font-semibold text-gray-800 bg-gray-50 px-6 py-4 border-b border-gray-200">
          Categories
        </h3>
        <div className="flex flex-col gap-2 p-4">
          {/* "All" */}
          <div
            className="flex items-center gap-3 text-sm text-gray-700 hover:text-orange-600 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            onClick={() => handleCheckboxChange("All")}
          >
            <input
              type="checkbox"
              checked={selectedCategories.length === 0}
              onChange={() => handleCheckboxChange("All")}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
            />
            <span>All</span>
          </div>

          {/* Dynamic Category List */}
          {productCategories
            .filter((category) => category.name !== "All")
            .map((category) => (
              <div
                key={category.id || category.name}
                className="flex items-center gap-3 text-sm text-gray-700 hover:text-orange-600 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                onClick={() => handleCheckboxChange(category.name)}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCheckboxChange(category.name)}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <span>{category.name}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LeftCategory;
