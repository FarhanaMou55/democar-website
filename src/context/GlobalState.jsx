import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  return (
    <GlobalContext.Provider value={{ wishlistItems, setWishlistItems, cartItems, setCartItems }}>
      {children}
    </GlobalContext.Provider>
  );
};
