import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LeftCategory from "./LeftCategory";
import RightProductsDetalis from "./RightProductsDetalis";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ Fetch product data
  useEffect(() => {
    fetch("/src/pages/products/Products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  // ✅ Fetch category data
  useEffect(() => {
    fetch("/src/assets/Productscategory.json")
      .then((res) => res.json())
      .then((data) => setProductCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // ✅ Read category from URL only after products are loaded
  useEffect(() => {
    if (products.length === 0) return;

    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams, products]);

  // ✅ Sync selected category to URL
  useEffect(() => {
    if (selectedCategories.length > 0) {
      setSearchParams({ category: selectedCategories[0] });
    } else {
      setSearchParams({});
    }
  }, [selectedCategories, setSearchParams]);

  // ✅ Filter products by category (case-insensitive)
  const filteredProducts =
    selectedCategories.length > 0 && selectedCategories[0] !== "All"
      ? products.filter((product) =>
          selectedCategories.some(
            (cat) =>
              product.category &&
              product.category.toLowerCase() === cat.toLowerCase()
          )
        )
      : products; // If "All" is selected, show all products

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
            {/* Sidebar */}
            <div className="w-full lg:w-1/4">
              <LeftCategory
                productCategories={productCategories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            </div>

            {/* Main Product Grid */}
            <div className="w-full lg:w-3/4">
              {filteredProducts.length === 0 ? (
                <div className="text-center text-gray-500 text-lg">
                  No products found for selected category.
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
