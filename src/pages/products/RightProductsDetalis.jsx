import React from "react";
import CartDesign from "./CartDesign"; // ✅ Ensure this path is correct based on your folder structure

const RightProductsDetalis = ({ products }) => {
  return (
    <div >
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
            discountPresent={product.discountPresent}
            productSell={product.productSell}
            viewCart={product.viewCart}
            review={product.review}
          />
        ))}
      </div>
    </div>
  );
};

export default RightProductsDetalis;
