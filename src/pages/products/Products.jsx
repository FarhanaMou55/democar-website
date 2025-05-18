import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LeftCategory from "./LeftCategory";
import RightProductsDetalis from "./RightProductsDetalis";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch products from public folder
  useEffect(() => {
    fetch("/Products.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
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

  // Fetch product categories
  useEffect(() => {
    fetch("/Productscategory.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setProductCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Read category from URL search param
  useEffect(() => {
    if (products.length === 0) return;
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams, products]);

  // Update search param when selected category changes
  useEffect(() => {
    if (selectedCategories.length > 0) {
      setSearchParams({ category: selectedCategories[0] });
    } else {
      setSearchParams({});
    }
  }, [selectedCategories, setSearchParams]);

  // Filter products by category
  const filteredProducts =
    selectedCategories.length > 0 && selectedCategories[0] !== "All"
      ? products.filter((product) =>
          selectedCategories.some(
            (cat) =>
              product.category &&
              product.category.toLowerCase() === cat.toLowerCase()
          )
        )
      : products;

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="w-10/12 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 py-8">
        <div className="md:col-span-1">
          <LeftCategory
            productCategories={productCategories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="md:col-span-3">
          <RightProductsDetalis products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default Products;
