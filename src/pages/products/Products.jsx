import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LeftCategory from "./LeftCategory";
import RightProductsDetalis from "./RightProductsDetalis";

// ✅ Import all images here
import toyotaImg from "../../assets/2023-corolla-hybrid-se-rubyflarepearl-016-1665769538.avif";
import teslaImg from "../../assets/tesla-6889042_640.jpg";
import fordF150Img from "../../assets/side-view-white-modern-car-outdoors.jpg";
import bmw3Img from "../../assets/white-sport-sedan-with-colorful-tuning-road.jpg";
import hyundaiIoniqImg from "../../assets/2023-hyundai-ioniq-6-01.jpg";
import nissanAltimaImg from "../../assets/Nissan Altima 2023.jpg";
import mustangMachEImg from "../../assets/Ford Mustang Mach-E.jpg";
import bmwX5Img from "../../assets/BMW X5.jpg";
import rav4HybridImg from "../../assets/Toyota RAV4 Hybrid.jpg";
import audiQ5Img from "../../assets/Audi Q5.jpg";
import rogueImg from "../../assets/Nissan Rogue 2023.webp";
import bmwM4Img from "../../assets/BMW-M4-Backgrounds-Desktop.jpg";
import fordBroncoImg from "../../assets/Ford Bronco 2023.webp";
import audiA4Img from "../../assets/Audi A4 2023.jpg";
import mercedesGLCImg from "../../assets/Mercedes-Benz GLC 2024.webp";



const imageMap = {
  "2023-corolla-hybrid-se-rubyflarepearl-016-1665769538.avif": toyotaImg,
  "tesla-6889042_640.jpg": teslaImg,
  "side-view-white-modern-car-outdoors.jpg": fordF150Img,
  "white-sport-sedan-with-colorful-tuning-road.jpg": bmw3Img,
  "2023-hyundai-ioniq-6-01.jpg": hyundaiIoniqImg,
  "Nissan Altima 2023.jpg": nissanAltimaImg,
  "Ford Mustang Mach-E.jpg": mustangMachEImg,
  "BMW X5.jpg": bmwX5Img,
  "Toyota RAV4 Hybrid.jpg": rav4HybridImg,
  "Audi Q5.jpg": audiQ5Img,
  "Nissan Rogue 2023.webp": rogueImg,
  "BMW-M4-Backgrounds-Desktop.jpg": bmwM4Img,
  "Ford Bronco 2023.webp": fordBroncoImg,
  "Audi A4 2023.jpg": audiA4Img,
  "Mercedes-Benz GLC 2024.webp": mercedesGLCImg,
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch("/Products.json")
      .then((res) => res.json())
      .then((data) => {
        const updatedProducts = data.map((product) => {
          const imageFileName = product.image.split("/").pop();
          return {
            ...product,
            image: imageMap[imageFileName] || product.image,
          };
        });
        setProducts(updatedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/Productscategory.json")
      .then((res) => res.json())
      .then((data) => setProductCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams, products]);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      setSearchParams({ category: selectedCategories[0] });
    } else {
      setSearchParams({});
    }
  }, [selectedCategories, setSearchParams]);

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
