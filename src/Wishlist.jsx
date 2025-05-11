import React from "react"; 
import HeadDetails from "./Components/HeadDetails";
import { useGlobalContext } from "./context/GlobalState";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wishlist = () => {
  const { wishlistItems, cartItems, setCartItems, setWishlistItems } = useGlobalContext();
  const navigate = useNavigate();

  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.productId === item.productId);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
      toast.info("Increased quantity in cart");
    } else {
      const newItem = {
        cartItemId: item.productId,
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: item.price,
        discountPrice: item.discountPrice,
        quantity: 1,
      };
      setCartItems([...cartItems, newItem]);
      toast.success("Added to cart from wishlist!");
    }
  };

  const handleRemove = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.productId !== productId));
    toast.success("Removed from wishlist");
  };

  return (
    <div>
      <div className="flex flex-col gap-6 md:gap-10 lg:gap-12">
        <div className="flex flex-col gap-6 mb-10">
          <HeadDetails
            title={"Products"}
            colortitle={"Wishlist"}
            subtitle={"Your product wish is our first priority."}
          />

          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8">
              {wishlistItems.map((item) => (
                <div
                  key={item.productId}
                  className="border p-4 rounded-lg shadow group hover:shadow-lg transition relative"
                >
                  <div
                    onClick={() => handleCardClick(item.productId)}
                    className="cursor-pointer p-4"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded"
                    />
                    <h2 className="text-lg font-bold mt-2">{item.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">${item.discountPrice}</p>
                  </div>

                  <div className="flex items-center gap-4 px-4 pb-4">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-black transition duration-300 text-sm"
                    >
                      <FaShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <RiDeleteBin6Line size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-black text-lg lg:text-xl text-center pt-10 pb-20">
              Your wishlist is empty.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
