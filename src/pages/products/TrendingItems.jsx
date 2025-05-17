import React, { useEffect, useState } from "react";
import CartDesign from "./CartDesign";
import carData from "../products/data/carData"; // ✅ Adjust path if needed

const TrendingItems = ({ selectedCategory }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Filter only trending items from carData
    const trendingProducts = carData.filter(
      (product) => product.productDisplayCategory === "Trending-Items"
    );
    setAllProducts(trendingProducts);
    setFilteredProducts(trendingProducts);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, allProducts]);

  return (
    <div>
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex justify-center items-center h-48 text-gray-500 text-lg font-medium">
          No trending products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <CartDesign
              key={product.id}
              productId={product.id}
              title={product.title}
              image={product.image}
              category={product.category}
              rating={product.rating}
              discountPrice={product.discountPrice}
              price={product.price}
              discountPresent={product.discountPresent}
              productSell={product.productSell}
              viewCart={product.viewCart}
              review={product.review}
              productDisplayCategory={product.productDisplayCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingItems;
