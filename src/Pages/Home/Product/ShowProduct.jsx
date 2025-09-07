import React from "react";
import useAddItem from "../../../Hook/useAddItem";
import { HeadingH2 } from "../../../Components/ShareCompo/Typography";
import { useNavigate } from "react-router";

function ShowProduct() {
  const { addItem } = useAddItem();
  const navigate = useNavigate()

  const handleDetails = (id) => {
    navigate(`/product-details/${id}`)
  };


  return (
    <div className="p-6">
      {/* Heading */}

     <div className="py-5 text-center">
       <HeadingH2 headH2={'Our Products'}></HeadingH2>
     </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {addItem.map((product, index) => (
          <div
            key={product._id?.$oid || index}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 p-5 flex flex-col"
          >
            {/* Product Image */}
            <div className="w-full h-48 flex items-center justify-center bg-gray-50 rounded-lg mb-4">
              <img
                src={product.imageURL}
                alt={product.productName}
                className="h-40 object-contain"
                draggable={false}
              />
            </div>

            {/* Product Name */}
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {product.productName}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {product.description}
            </p>

            {/* Price Section */}
            <div className="flex py-2 items-center gap-3 ">
              <span className="text-green-600 font-bold text-xl">
                ${product.offerPrice || product.price}
              </span>
              {product.offerPrice && (
                <span className="line-through text-gray-400">${product.price}</span>
              )}
            </div>


            {/* Details Button */}
            <button
              onClick={() => handleDetails(product._id)}
              className="font-medium cursor-pointer bg-gradient-to-r from-cyan-700 to-blue-400 px-5 rounded text-white py-2 mt-auto"
            >
              View Details
            </button>


          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowProduct;
