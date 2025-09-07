import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import { CartContext } from "../../../../AuthProver/CartProvider"; // Assuming you have this

function Cart_Component({
  cartProducts,
  address,
  tempAddress,
  setTempAddress,
  showAddressForm,
  setShowAddressForm,
  updateAddress,
  removeFromCart,
  handlePlaceOrder,
}) {


  const { updateQuantity } = useContext(CartContext); // Function to update quantity

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-3 mx-auto">

      {/* ================== Cart Items Section ================== */}
      <div className="flex-1 max-w-4xl">

        <h1 className="text-xl font-bold mb-6">
          Shopping Cart{" "}
          <span className="text-sm font-normal text-indigo-500">{cartProducts.length} Items</span>
        </h1>

        {cartProducts.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium pt-3 gap-3 md:gap-0 border-b border-gray-200 pb-4"
          >
            {/* Product Image + Details */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
              <div className="w-24 h-24 flex items-center justify-center border rounded overflow-hidden">
                <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
              </div>
              <div>
                <p className="font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>Size: {product.size || "N/A"}</p>
                  <div className="flex items-center gap-2">
                    <p>Qty:</p>
                    <select
                      className="outline-none"
                      value={product.quantity}
                      onChange={(e) => updateQuantity(product._id, Number(e.target.value))}
                    >
                      {Array(5).fill("").map((_, idx) => (
                        <option key={idx} value={idx + 1}>{idx + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Price */}
            <p className="text-center mt-2 md:mt-0">${product.offerPrice * product.quantity}</p>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(product._id)}
              aria-label={`Remove ${product.name} from cart`}
              className="text-red-600 text-2xl p-2 flex items-center justify-center md:justify-end"
            >
              <MdDelete />
            </button>
          </div>
        ))}

        {cartProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No products in your cart.</p>
        )}

        <div className="mt-6">
          <Link
            to={"/shop"}
            className="p-2 bg-blue-300 rounded hover:bg-blue-400 transition"
          >
            Continue Shopping...
          </Link>
        </div>

      </div>

      {/* ================== Order Summary Section ================== */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-3 max-md:mt-16 border border-gray-300/70 rounded">
        <h2 className="text-xl md:text-xl font-medium mb-4">Order Summary</h2>

        {/* Delivery Address */}
        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex flex-col mt-2 gap-2">

            {showAddressForm ? (
              <div className="flex bg-white p-4 py-8 rounded shadow flex-col gap-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={tempAddress.name}
                  required
                  onChange={(e) => setTempAddress({ ...tempAddress, name: e.target.value })}
                  className="border rounded border-indigo-300 outline-none p-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={tempAddress.email}
                  onChange={(e) => setTempAddress({ ...tempAddress, email: e.target.value })}
                  className="border rounded border-indigo-300 outline-none p-2"
                />

                <input
                  type="text"
                  placeholder="Street"
                  value={tempAddress.street}
                  onChange={(e) => setTempAddress({ ...tempAddress, street: e.target.value })}
                  className="border rounded border-indigo-300 outline-none p-2"
                />
                <input
                  type="text"
                  placeholder="District"
                  value={tempAddress.district}
                  onChange={(e) => setTempAddress({ ...tempAddress, district: e.target.value })}
                  className="border rounded border-indigo-300 outline-none p-2"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={tempAddress.city}
                  onChange={(e) => setTempAddress({ ...tempAddress, city: e.target.value })}
                  className="border rounded border-indigo-300 outline-none p-2"
                />

                <input
                  type="text"
                  placeholder="ZIP"
                  value={tempAddress.zip}
                  onChange={(e) => setTempAddress({ ...tempAddress, zip: e.target.value })}
                  className="border rounded border-indigo-300 outline-none p-2"
                />



                <input
                  type="text"
                  placeholder="Country"
                  value={tempAddress.country}
                  onChange={(e) => setTempAddress({ ...tempAddress, country: e.target.value })}
                  className="border rounded border-indigo-300 outline-none p-2"
                />

                <button
                  onClick={() => {
                    updateAddress(tempAddress);
                    setShowAddressForm(false);
                  }}
                  className="bg-indigo-500 text-white py-2 mt-2 hover:bg-indigo-600 transition rounded"
                >
                  Save Address
                </button>
              </div>

            ) : (
              <div className="relative  py-2  px-3 border border-gray-300 rounded bg-white justify-center   gap-1 text-sm">
                

                {address.name ? (
                  
                  <>
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="absolute  right-2 -top-7   text-indigo-500 hover:underline text-sm"
                    >
                      Change
                    </button>

                    <p><span className="font-medium  text-blue-800">Name:</span> {address.name}</p>
                    <p><span className="font-medium text-blue-800">Email:</span> {address.email}</p>
                    <p><span className="font-medium text-blue-800">Street:</span> {address.street}</p>
                    <p><span className="font-medium text-blue-800">District:</span> {address.district}</p>
                    <p><span className="font-medium text-blue-800">City:</span> {address.city}</p>
                    <p><span className="font-medium text-blue-800">ZIP:</span> {address.zip}</p>
                    <p><span className="font-medium text-blue-800">Country:</span> {address.country}</p>

                  </>
                ) : (

                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="text-indigo-500 hover:underline  self-start"
                  >
                    Add Address
                  </button>
                )}
                
              </div>
            )}

          </div>
        </div>

        {/* Payment Method */}
        <p className="text-sm font-medium uppercase mb-2">Payment Method</p>

        <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none mb-4">

          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>

        </select>

        {/* Price Summary */}
        <div className="text-gray-500 mt-4 space-y-2">

          <p className="flex justify-between">
            <span>Price</span>
            <span>${cartProducts.reduce((sum, p) => sum + p.offerPrice * p.quantity, 0)}</span>
          </p>

          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>

          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>${Math.round(cartProducts.reduce((sum, p) => sum + p.offerPrice * p.quantity, 0) * 1.02)}</span>
          </p>

      </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full py-2 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition rounded"
        >
          Place Order
        </button>

      </div>
    </div>
  );
}

export default Cart_Component;
