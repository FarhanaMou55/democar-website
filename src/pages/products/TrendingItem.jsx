import React, { useState, useEffect } from "react";
import TrendingItems from "./TrendingItems";
import carData from "../products/data/carData"; // ✅ Adjust the path to your dataset

const TrendingItem = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [category, setCategory] = useState([]);

  useEffect(() => {
    // ✅ Filter trending items from carData
    const trendingProducts = carData.filter(
      (product) => product.productDisplayCategory === "Trending-Items"
    );

    // ✅ Extract unique categories from trending items
    const uniqueCategories = [
      { id: 0, name: "All" },
      ...Array.from(new Set(trendingProducts.map((item) => item.category)))
        .filter(Boolean)
        .map((cat, index) => ({
          id: index + 1,
          name: cat,
        }))
    ];

    setCategory(uniqueCategories);
  }, []);

  return (
    <div className="my-16 md:my-20 w-10/12 mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-700">
              Trending <span className="text-[#ff0000]">Items</span>
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Explore the latest trends in fashion, electronics, and more.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 overflow-hidden">
            {category.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`text-md font-medium ${
                  selectedCategory === cat.name
                    ? "text-white bg-[#ff0000]"
                    : "text-gray-800 bg-gray-100"
                } px-3 py-1 rounded-md w-fit cursor-pointer`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <TrendingItems selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default TrendingItem;
