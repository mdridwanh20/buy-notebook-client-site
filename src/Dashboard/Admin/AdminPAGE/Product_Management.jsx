import React from "react";
import useAddItem from "../../../Hook/useAddItem";
import { FaEdit, FaTrash, FaBoxOpen } from "react-icons/fa";
import api from "../../../Hook/AxiosUrl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function Product_Management() {
  const { addItem , setAddItem} = useAddItem();
  const navigate = useNavigate()

  const placeholderImage =
    "https://cdn-icons-png.flaticon.com/512/8343/8343149.png"; // fallback image
    
    
    // delete user
  const handlerDeleteItem = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d7",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {

          const response = await api.delete(`/add-item/${id}`);
          
          setAddItem((prevItems) => prevItems.filter((item) => item._id !== id));


          console.log(response.data);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log("Delete user error", response.data);
      toast.error("Delete user error");
    }
  };


  const handlerUpdate =(id) => {

    navigate(`/dashboard/update-product/${id}`)
    console.log();
    

  }


  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Product Management: {addItem.length} </h2>

      {/* No products */}
      {(!addItem || addItem.length === 0) && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
          <FaBoxOpen className="text-5xl text-gray-400" />
          <h3 className="text-lg font-semibold">No products available</h3>
          <p className="text-sm text-gray-400">
            Please add some items to see them here.
          </p>
        </div>
      )}

      {/* Products table */}
      {addItem && addItem.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Offer Price</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {addItem.map((product, index) => (
                <tr key={index} className="text-center ">
                  {/* Image with placeholder */}
                  <td className="border border-gray-300 px-2 py-2">
                    
                    <img
                      src={product.imageURL || placeholderImage}
                      alt={product.productName || "No Image"}
                      className="w-12 h-12 md:w-16 md:h-16 object-cover mx-auto rounded"
                    />
                  </td>

                  {/* Name */}
                  <td className="border border-gray-300 px-2 py-2">
                    {product.productName || "-"}
                  </td>

                  {/* Category */}
                  <td className="border border-gray-300 px-2 py-2">
                    {product.category || "-"}
                  </td>

                  {/* Price */}
                  <td className="border border-gray-300 px-2 py-2">
                    {product.price ? `$${product.price}` : "-"}
                  </td>

                  {/* Offer Price */}
                  <td className="border border-gray-300 px-2 py-2 text-green-600 font-medium">
                    {product.offerPrice ? `$${product.offerPrice}` : "-"}
                  </td>

                  {/* Description */}
                  <td className="border border-gray-300 px-2 py-2 truncate max-w-[150px] md:max-w-[250px]">
                    {product.description || "-"}
                  </td>

                  {/* Actions */}
                  <td className="border border-gray-300  gap-5 ">

                    <button onClick={() => handlerUpdate(product._id)} className="text-blue-500 lg:m-2 m-1 border p-2 rounded hover:text-blue-700  lg:text-lg">
                      <FaEdit />
                    </button>

                    <button onClick={() => {
                      handlerDeleteItem(product._id)

                    }} className="text-red-500 lg:m-2 m-1 border p-2 rounded hover:text-red-700  lg:text-lg">
                      <FaTrash />
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
