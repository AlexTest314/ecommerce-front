import { createContext } from "react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const CartContext = createContext({});

const CartContextProvider = ({ children }) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const defaultProducts = ls ? JSON.parse(ls.getItem("cart")) : [];

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  const addProduct = (productId) => {
    setCartProducts((prev) => [...prev, productId]);
  };
  const removeProduct = (productId) => {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  };

  const clearCart = () => {
    setCartProducts([]);
    ls?.setItem("cart", JSON.stringify(cartProducts));
  };
  return <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
