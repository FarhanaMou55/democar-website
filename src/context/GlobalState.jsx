import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const clearCart = () => {
    setCartItems([]); // This is the key part
  };

  return (
    <GlobalContext.Provider
      value={{
        wishlistItems,
        setWishlistItems,
        cartItems,
        setCartItems,
        addToCart,
        clearCart, // <-- Now available in your Payment component
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
