import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import HeadDetails from "./Components/HeadDetails";
import { useGlobalContext } from "./context/GlobalState";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const AddToCarts = () => {
  const { cartItems, setCartItems } = useGlobalContext();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.discountPrice || item.price) || 0;
    const quantity = parseInt(item.quantity) || 1;
    return total + price * quantity;
  }, 0);

  const handleIncrease = (cartItemId) => {
    setCartItems(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const handleDecrease = (cartItemId) => {
    setCartItems(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) }
          : item
      )
    );
  };

  const handleRemove = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
    toast.success("Item removed from cart");
  };

  const handleProceedToCheckout = () => {
    navigate("/payment"); // ✅ Do NOT clear cart here
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 md:gap-10 lg:gap-12">
        <HeadDetails
          title="Add To"
          colortitle="Carts"
          subtitle="Your product wish is our first priority."
        />

        <div className="mb-10">
          <div className="w-full max-w-5xl mx-auto space-y-6 text-gray-600">
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                const price = parseFloat(item.discountPrice || item.price) || 0;
                const basePrice = parseFloat(item.price) || 0;
                const quantity = parseInt(item.quantity) || 1;

                return (
                  <div key={item.cartItemId} className="border-b border-gray-200 pb-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img
                          className="size-16 sm:size-20 object-cover rounded-md"
                          src={item.image}
                          alt={item.title}
                        />
                        <div className="flex-1 sm:flex-none">
                          <div className="font-medium text-sm sm:text-base">
                            {item.title}
                          </div>
                          <div className="text-xs uppercase font-semibold opacity-60">
                            {item.category}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto sm:gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            aria-label="Decrease quantity"
                            className="text-sm bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300 disabled:opacity-50"
                            onClick={() => handleDecrease(item.cartItemId)}
                            disabled={quantity <= 1}
                          >
                            -
                          </button>
                          <span className="min-w-[20px] text-center">
                            {quantity}
                          </span>
                          <button
                            aria-label="Increase quantity"
                            className="text-sm bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300"
                            onClick={() => handleIncrease(item.cartItemId)}
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="font-medium text-right sm:w-24">
                          ${(price * quantity).toFixed(2)}
                          {item.discountPrice && (
                            <div className="text-xs line-through text-gray-500">
                              ${(basePrice * quantity).toFixed(2)}
                            </div>
                          )}
                        </div>

                        {/* Delete */}
                        <button
                          aria-label="Remove item"
                          className="text-red-500 hover:text-red-700 ml-2 sm:ml-0"
                          onClick={() => handleRemove(item.cartItemId)}
                        >
                          <RiDeleteBin6Line size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center py-10 text-gray-500">
                Your cart is empty.
              </p>
            )}

            {cartItems.length > 0 && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-base sm:text-lg">
                    Total (
                    {cartItems.reduce(
                      (acc, item) => acc + (parseInt(item.quantity) || 1),
                      0
                    )}{" "}
                    items)
                  </div>
                  <div className="font-bold text-lg sm:text-xl">
                    ${totalPrice.toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={handleProceedToCheckout}
                  className="mt-4 w-full bg-[#ff0000] hover:bg-orange-600 text-white py-2 rounded-md transition-colors cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCarts;
