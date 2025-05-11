import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import CartDesign from "./CartDesign";
import HeadDetails from "../../Components/HeadDetails";
import { useGlobalContext } from "../../context/GlobalState";
import RatingStars from "../RatingStars ";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, setCartItems, wishlistItems, setWishlistItems } = useGlobalContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch("/src/pages/products/Products.json")
      .then((res) => res.json())
      .then((data) => {
        const filterProduct = data.find((prod) => prod.id == id);
        setProduct(filterProduct);
      });
  }, [id]);

  useEffect(() => {
    if (product) {
      fetch("/src/pages/products/Products.json")
        .then((res) => res.json())
        .then((data) => {
          const filteredRelatedProducts = data.filter(
            (item) => item.category === product.category && item.id !== product.id
          );
          setRelatedProducts(filteredRelatedProducts);
        })
        .catch((error) => console.error("Error fetching related products:", error));
    }
  }, [product]);

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const existingIndex = cartItems.findIndex((item) => item.productId === product.id);

    if (existingIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingIndex].quantity += quantity;
      setCartItems(updatedItems);
      toast.info("Quantity updated in cart");
    } else {
      const newItem = {
        cartItemId: uuidv4(),
        productId: product.id,
        title: product.title,
        image: product.image,
        category: product.category,
        price: product.price,
        discountPrice: product.discountPrice,
        quantity: quantity,
      };
      setCartItems([...cartItems, newItem]);
      toast.success("Product added to cart");
    }

    navigate("/addtocart");
  };

  const handleAddToWishlist = () => {
    const exists = wishlistItems.find((item) => item.productId === product.id);
    if (!exists) {
      setWishlistItems([
        ...wishlistItems,
        {
          productId: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          discountPrice: product.discountPrice,
        },
      ]);
      toast.success("Product added to wishlist");
    } else {
      toast.info("Already in wishlist");
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-10 lg:gap-12 w-11/12 mx-auto">
      <div className="w-full max-w-5xl mx-auto mt-5">
        {product ? (
          <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl border border-gray-300 p-8">
            <div className="w-full lg:w-1/2 relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover rounded-2xl"
              />
              <button
                onClick={handleAddToWishlist}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-[#ff0000] hover:text-white transition-colors duration-300"
              >
                <FaRegHeart className="h-6 w-6" />
              </button>
            </div>

            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <p className="text-sm text-gray-500 mt-2">{product.subtitle}</p>
              <div className="flex items-center space-x-2 mt-4">
                <div className="flex items-center text-yellow-400">
                  <RatingStars rating={product.rating} />
                </div>
                <span className="text-sm text-gray-600">{product.review} Reviews</span>
              </div>

              <div className="mt-6 flex flex-wrap items-end gap-4">
                <p className="text-2xl lg:text-4xl font-bold text-gray-900">
                  ${product.discountPrice}
                </p>
                <p className="text-base lg:text-lg text-gray-500 line-through">
                  ${product.price}
                </p>
                <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-orange-600 to-[#ff0000] text-white px-3 py-1 rounded-full">
                  {product.discountPresent}% Off
                </span>
              </div>

              <div className="mt-6 flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">
                  PKU: <span className="font-medium">{product.Model}</span>
                </div>
                <div className="text-sm font-semibold text-[#ff0000]">In Stock</div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-700">{product.details}</p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                    onClick={() => handleQuantityChange("decrease")}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    className="w-12 text-center focus:outline-none text-gray-600"
                    readOnly
                  />
                  <button
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                    onClick={() => handleQuantityChange("increase")}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-[#ff0000] to-orange-500 text-white rounded-lg hover:from-gray-800 hover:to-black transition-all duration-300 shadow-lg cursor-pointer"
                >
                  <FaShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading product details...</p>
        )}
      </div>

      <div className="mb-14">
        <HeadDetails title={"Related"} colortitle={"Products"} />
        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <CartDesign
                key={relatedProduct.id}
                productId={relatedProduct.id}
                title={relatedProduct.title}
                image={relatedProduct.image}
                category={relatedProduct.category}
                rating={relatedProduct.rating}
                discountPrice={relatedProduct.discountPrice}
                price={relatedProduct.price}
                discountPresent={relatedProduct.discountPresent}
                productSell={relatedProduct.productSell}
                viewCart={relatedProduct.viewCart}
                review={relatedProduct.review}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">
            No related products found in this category
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
