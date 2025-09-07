import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../../../AuthProver/CartProvider";
import Cart_Component from "./Cart_Component";
import useAddItem from "../../../../Hook/useAddItem";
import toast from "react-hot-toast";
import { useParams } from "react-router";

export default function Cart() {
  const { cart, removeFromCart, address, updateAddress } = useContext(CartContext);
  
  
  const { addItem } = useAddItem();
  const {id} = useParams()


  // get data form local host 'cart-item'






  // ✅ Address form toggle
  const [showAddressForm, setShowAddressForm] = useState(false);


  // ✅ Temporary address state for form
  const [tempAddress, setTempAddress] = useState({
    name: "",
    email: "",
    street: "",
    district: "",
    city: "",
    zip: "",
    country: "",
  });



  // ✅ Initialize tempAddress from context when component mounts or address updates
  useEffect(() => {
    setTempAddress(address);
  }, [address]);




  // ✅ Place order handler
  const handlePlaceOrder = () => {
    if (!tempAddress.name || !tempAddress.street || !tempAddress.city) {
      return toast.error("Address is incomplete. Please fill required fields.");
    }




    updateAddress(tempAddress); // ✅ Save address to context + localStorage
    toast.success("Order placed successfully!");
  };




  
  return (
    <Cart_Component
      products={products} // ✅ all products

      cartProducts={cartProducts} // ✅ products in cart-item

      address={address} // ✅ current address from context
      tempAddress={tempAddress} // ✅ temp address for form
      setTempAddress={setTempAddress} // ✅ setter for form input
      showAddressForm={showAddressForm} // ✅ toggle for showing form
      setShowAddressForm={setShowAddressForm} // ✅ setter for toggle
      updateAddress={updateAddress} // ✅ update context address
      removeFromCart={removeFromCart} // ✅ remove product from cart
      handlePlaceOrder={handlePlaceOrder} // ✅ place order
    />
  );
}
