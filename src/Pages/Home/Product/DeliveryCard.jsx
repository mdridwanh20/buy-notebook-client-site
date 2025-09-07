import React from "react";
import { AiOutlineTruck, AiOutlineMessage } from "react-icons/ai";
import { FiRefreshCw, FiShield } from "react-icons/fi";
import { Link } from "react-router";

export default function DeliveryCard({
  address = "Dhaka, Dhaka North, Banani Road No. 12 - 19",
  deliveryFee = 70,
  deliveryDate = "8-12 Sep",
  cashOnDelivery = true,
  returnDays = 7,
  warranty = "Not available",
  seller = "Infinity Store",
  shipOnTime = "100%",
  sellerRating = "New Seller",
  chatResponse = "Not enough data",
}) {
  return (
    <div className="w-full max-w-sm border rounded-2xl bg-white border-gray-300 shadow-lg p-5 text-sm hover:shadow-xl transition">

      {/* Delivery Options */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <AiOutlineTruck className="w-5 h-5 text-indigo-500" />
          Delivery Options
        </h3>

        <div className="flex flex-col items-start mb-3">
          <p className="text-gray-700 leading-5">{address}</p>

          <button className="text-indigo-600 text-xs font-medium hover:underline">
            CHANGE
          </button>
          
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Standard Delivery</span>
          <span className="font-semibold text-gray-900">৳ {deliveryFee}</span>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          Guaranteed by <span className="font-medium">{deliveryDate}</span>
        </p>

        {cashOnDelivery && (
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <FiShield className="w-4 h-4" />
            Cash on Delivery Available
          </div>
        )}
      </div>

      <hr className="my-5 border-gray-400" />

      {/* Return & Warranty */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FiRefreshCw className="w-4 h-4 text-indigo-500" />
          Return & Warranty
        </h3>
        <p className="text-gray-700 mb-1">{returnDays} Days Returns</p>
        <p className="text-gray-700">Warranty: {warranty}</p>
      </div>

      <hr className="my-5 border-gray-400" />

      {/* Seller Info */}
      <div>
        <p className="text-gray-700 text-sm mb-2">
          Sold by <span className="font-semibold">{seller}</span>
        </p>
        <button className="flex items-center gap-1 text-indigo-600 text-xs font-medium mb-4 hover:underline">
          <AiOutlineMessage className="w-4 h-4" />
          Chat Now
        </button>

        <div className="grid grid-cols-3 text-center text-xs border border-gray-400 rounded-lg divide-x overflow-hidden">

          <div className="p-3 border-0 border-e-1 border-gray-400 50">
            <p className="text-gray-500">Seller Rating</p>
            <p className="font-semibold text-gray-900">{sellerRating}</p>
          </div>

          <div className="p-3 border-0 border-e-1 border-gray-400 50">
            <p className="text-gray-500">Ship on Time</p>
            <p className="font-semibold text-gray-900">{shipOnTime}</p>
          </div>

          <div className="p-3  50">
            <p className="text-gray-500">Chat Rate</p>
            <p className="font-semibold text-gray-900">{chatResponse}</p>
          </div>

        </div>
        
      </div>

     <div className="flex items-center justify-center">
         <Link to={"/shop"} className="w-full text-center mt-5 py-2.5 rounded-lg text-indigo-600 font-semibold text-sm border border-indigo-400 hover:bg-indigo-50 transition">
        GO TO SHOP
      </Link>
     </div>

    </div>
  );
}
