import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import useAddItem from "../../../Hook/useAddItem";
import DeliveryCard from "./DeliveryCard";
import { CartContext } from "../../../AuthProver/CartProvider";

export default function Product_Details() {
  const { id } = useParams();
  const { addItem } = useAddItem();
  const navigate = useNavigate()

  const { addToCart } = useContext(CartContext);

  // add to cart data : 

  const handlerAddToCart = (id) => {
    
    addToCart(id)
    navigate(`/cart/${id}`)
  }
 
  console.log(addToCart);
  

  // find product by id
  const product = addItem.find(
    (item) => item._id === id || item._id?.$oid === id
  );

  
  if (!product) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-red-500">Product not found</h2>
      </div>
    );
  }



  const description = [
    "High-quality material",
    "Comfortable for everyday use",
    "Available in different sizes",
  ];

  return (
    <div className="container border bg-white border-gray-300 rounded lg:flex items-center gap-10 justify-between m-auto  w-full px-6 my-10">
      {/* right side component*/}
      <div className="  my-10">
        <p className="text-sm text-gray-500">
          <span>Home</span> / <span>Products</span> /{" "}
          <span className="text-indigo-500">{product.productName}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-6">
          {/* Images Section */}

          <div className="flex border-gray-200 rounded-md border p-3 gap-3">
            <div className="">
              <img src={product.imageURL} alt="" />
            </div>
          </div>

          {/* Details Section */}
          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.productName}</h1>

            {/* Rating */}
            <div className="flex items-center gap-0.5 mt-1">
              <p className="text-base ">{product.rating || "No rating"}</p>
            </div>

            {/* Price */}
            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: ${product.price}
              </p>

              <p className="text-2xl font-medium">
                OFFER: ${product.offerPrice}
              </p>

              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            {/* About product */}
            <p className="text-base font-medium mt-6">About Product</p>

            <ul className="list-disc ml-4 text-gray-500/70">
              {description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => handlerAddToCart(product._id)}
                className="font-medium w-full border cursor-pointer border-gray-500 rounded text-black py-2"
              >
                Add to Cart
              </button>

              <button className="font-medium w-full cursor-pointer bg-gradient-to-r from-cyan-700 to-blue-400  rounded text-white py-2">
                Buy now
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* left side component*/}

      <div className="my-10">
        <DeliveryCard></DeliveryCard>
      </div>
    </div>
  );
}
