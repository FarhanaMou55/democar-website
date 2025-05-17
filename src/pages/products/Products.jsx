import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LeftCategory from "./LeftCategory";
import RightProductsDetalis from "./RightProductsDetalis";
import carData from "../products/data/carData"; // make sure path is correct
import categoryData from "../products/data/categoryData"; // make sure path is correct

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load static data
  useEffect(() => {
    try {
      setProducts(carData);
      setProductCategories(categoryData);
      setLoading(false);
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load data.");
      setLoading(false);
    }
  }, []);

  // Sync URL -> Category selection
  useEffect(() => {
    if (products.length === 0) return;
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const decodedCategory = decodeURIComponent(categoryParam);
      setSelectedCategories([decodedCategory]);
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams, products]);

  // Sync Category selection -> URL
  useEffect(() => {
    if (selectedCategories.length > 0) {
      setSearchParams({ category: selectedCategories[0] });
    } else {
      setSearchParams({});
    }
  }, [selectedCategories, setSearchParams]);

  // Filter products by selected category
  const filteredProducts =
    selectedCategories.length > 0 && selectedCategories[0] !== "All"
      ? products.filter((product) =>
          selectedCategories.includes(product.category)
        )
      : products;

  return (
    <div className="px-4 mt-6 my-8 w-10/12 mx-auto gap-4">
      <div className="flex flex-col gap-6 md:gap-10 lg:gap-12">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg">{error}</div>
        ) : (
          <div className="flex flex-col-reverse lg:flex-row gap-10 mb-10 lg:mb-16">
            {/* Left: Category Filters */}
            <div className="w-full lg:w-1/4">
              <LeftCategory
                productCategories={productCategories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            </div>

            {/* Right: Product List */}
            <div className="w-full lg:w-3/4">
              {filteredProducts.length === 0 ? (
                <div className="text-center text-gray-500 text-lg">
                  No products found for the selected category.
                </div>
              ) : (
                <RightProductsDetalis
                  products={filteredProducts}
                  navigate={navigate}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
