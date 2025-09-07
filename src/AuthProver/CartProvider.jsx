import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const [address, setAddress] = useState({
    name: "",
    email: "",
    district: "",
    city: "",
    street: "",
    zip: "",
    country: "",
  });


  useEffect(() => {
    // cart data
    const storedCart = JSON.parse(localStorage.getItem("cart-item")) || [];
    setCart(storedCart);


    // address data
    const storedAddress = JSON.parse(localStorage.getItem("address-data")) || {
      name: "",
      email: "",
      district: "",
      city: "",
      street: "",
      zip: "",
      country: "",
    };


    setAddress(storedAddress);

  }, []);



  // add to cart function
  const addToCart = (id) => {
    if (!cart.includes(id)) {
      const newCart = [...cart, id];
      setCart(newCart);
      localStorage.setItem("cart-item", JSON.stringify(newCart));
    }
  };




  // remove cart function from UI and local storage
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item !== id);
    setCart(newCart);
    localStorage.setItem("cart-item", JSON.stringify(newCart));
  };


  // update address functions
  const updateAddress = (newAddress) => {
    setAddress(newAddress);
    localStorage.setItem("address-data", JSON.stringify(newAddress));
  };



  const cartValue = {
    cart,
    setCart,
    address,
    setAddress,
    addToCart,
    removeFromCart,
    updateAddress,
  };



  return (
    <CartContext.Provider value={cartValue}> {children} </CartContext.Provider>
  );


}
