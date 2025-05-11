import React from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalState";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartDesign = ({
  productId,
  title,
  image,
  category,
  rating,
  discountPrice,
  price,
  discountPresent,
  productDisplayCategory,
  timeLeft,
}) => {
  const { wishlistItems, setWishlistItems, cartItems, setCartItems } = useGlobalContext();
  const navigate = useNavigate();

  const formatTime = (value) => value.toString().padStart(2, "0");

  const handleAddToCart = (e) => {
    e.stopPropagation(); // ✅ Prevent event bubbling
    e.preventDefault();

    const existingItemIndex = cartItems.findIndex((item) => item.productId === productId);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
      toast.info("Increased quantity in cart");
    } else {
      const newItem = {
        cartItemId: uuidv4(),
        productId,
        title,
        image,
        category,
        price,
        discountPrice,
        quantity: 1,
      };
      setCartItems([...cartItems, newItem]);
      toast.success("Added to cart!");
    }

    navigate("/addtocart");
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation(); // ✅ Prevent card click
    e.preventDefault();
    const existing = wishlistItems.find((item) => item.productId === productId);
    if (!existing) {
      setWishlistItems([
        ...wishlistItems,
        { productId, title, image, price, discountPrice },
      ]);
      toast.success("Added to wishlist!");
    } else {
      toast.info("Already in wishlist");
    }
  };

  const handleCardClick = () => {
    navigate(`/products/${productId}`);
  };

  return (
    <div
      onClick={handleCardClick} // ✅ whole card is clickable EXCEPT buttons
      className="bg-white shadow-xl hover:shadow-2xl rounded-lg transform hover:scale-105 transition-transform duration-300 p-4 cursor-pointer"
    >
      <div className="h-50 rounded-xl overflow-hidden">
        <img className="w-full h-full object-cover" src={image} alt={title} />
      </div>

      <div className="pt-4 px-2">
        <h2 className="text-base md:text-lg font-bold text-gray-800 truncate">{title}</h2>
        <p className="text-xs md:text-sm text-gray-500 mt-1">{category}</p>

        <div className="flex items-center mt-2">
          <span className="text-yellow-400 flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`mr-1 ${i >= rating ? 'text-gray-300' : ''}`} />
            ))}
          </span>
          <span className="ml-2 text-gray-600 text-xs md:text-sm">({rating})</span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm md:text-base font-semibold text-gray-800">
            ${discountPrice}{" "}
            <span className="text-xs md:text-sm text-gray-500 line-through">
              ${price}
            </span>
          </p>
          <p className="text-sm text-green-600">{discountPresent}% Off</p>
        </div>

        {productDisplayCategory === "Day-Of-The-Deal" && (
          <div className="mt-4 flex gap-4 items-center w-52 border-2 border-gray-400 rounded-lg p-2.5">
            <div className="flex flex-col items-center">
              <span className="countdown font-mono text-xl text-gray-800">{formatTime(timeLeft.days)}</span>
              <span>days</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="countdown font-mono text-xl text-gray-800">{formatTime(timeLeft.hours)}</span>
              <span>hours</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="countdown font-mono text-xl text-gray-800">{formatTime(timeLeft.minutes)}</span>
              <span>min</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="countdown font-mono text-xl text-gray-800">{formatTime(timeLeft.seconds)}</span>
              <span>sec</span>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-4 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-black transition duration-300 text-sm"
          >
            <FaShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={handleAddToWishlist}
            className="p-2 rounded-full border border-gray-200 hover:bg-[#ff0000] text-black hover:text-white transition-colors duration-300"
          >
            <FaRegHeart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDesign;
