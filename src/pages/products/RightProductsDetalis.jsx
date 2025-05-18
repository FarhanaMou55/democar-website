import React from "react";
import CartDesign from "./CartDesign"; // ✅ Ensure this path is accurate

const RightProductsDetalis = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-500 col-span-full">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <CartDesign
          key={product.id}
          productId={product.id}
          title={product.title}
          image={product.image}
          category={product.category}
          rating={product.rating}
          discountPrice={product.discountPrice}
          price={product.price}
          discountPercent={product.discountPercent}
          productSell={product.productSell}
          viewCart={product.viewCart}
          review={product.review}
        />
      ))}
    </div>
  );
};

export default RightProductsDetalis;
