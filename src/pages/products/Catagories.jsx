import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const categoriesPerSlide = 6;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/src/assets/Productscategory.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category.name)}`);
  };

  const nextSlide = () => {
    const nextIndex = currentIndex + categoriesPerSlide;
    if (nextIndex < categories.length) {
      setCurrentIndex(nextIndex);
    }
  };

  const prevSlide = () => {
    const prevIndex = currentIndex - categoriesPerSlide;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
    }
  };

  const visibleCategories = categories.slice(
    currentIndex,
    currentIndex + categoriesPerSlide
  );

  return (
    <div className="text-center w-11/12 mx-auto mt-10 mb-10">
      <div className="flex justify-center items-center space-x-4 mb-4">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={`p-2 bg-gray-300 text-white rounded-full hover:bg-gray-500 transition ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaArrowLeft />
        </button>

        <div className="flex flex-wrap justify-center gap-6 ">
          {visibleCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className=" cursor-pointer text-center shadow hover:shadow-lg transition duration-300 rounded-lg p-4 bg-amber-100 hover:text-white hover:bg-[#ff0000]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-20 w-28 mx-auto bg-white object-contain  mb-2"
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />
              <h3 className="text-sm font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentIndex + categoriesPerSlide >= categories.length}
          className={`p-2 bg-gray-300 text-white rounded-full hover:bg-gray-500 transition ${
            currentIndex + categoriesPerSlide >= categories.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Categories;
