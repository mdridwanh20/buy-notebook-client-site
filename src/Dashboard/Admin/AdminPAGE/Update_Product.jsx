import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { MyContext } from '../../../AuthProver/AuthProver';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import useAddItem from '../../../Hook/useAddItem';
import api from '../../../Hook/AxiosUrl';


export default function Update_Product() {

  const {id} = useParams()
  const {addItem} = useAddItem()
  const navigate = useNavigate();
  const { loading } = useContext(MyContext);

  // ==========================
  // State variables
  // ==========================
  const [currentProduct, setCurrentProduct] = useState(null) // 🔹 update: current product state
  const [preview, setPreview] = useState(null); // 🔹 update: image preview
  const [uploadImage, setUploadImage] = useState(null); // 🔹 update: selected file
  const [formLoading, setFormLoading] = useState(false);

  // ==========================
  // Find product by ID
  // ==========================
  useEffect(() => {
    if(addItem && id) {
      const found = addItem.find((item) => item._id === id)
      setCurrentProduct(found || null) // 🔹 update: set matched product
    }
  }, [addItem, id])

  // ==========================
  // Form submit function
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const productForm = e.target;
    const productName = productForm.productName.value;
    const description = productForm.description.value;
    const category = productForm.category.value;
    const price = productForm.price.value;
    const offerPrice = productForm.offerPrice.value;

    // ==========================
    // Handle image upload if new file selected
    // ==========================
    let uploadedImageURL = currentProduct?.imageURL; // 🔹 update: default to old image
    let deleteURL = currentProduct?.deleteURL; // 🔹 update: default old deleteURL

    if(uploadImage) {
      const formData = new FormData();
      formData.append("image", uploadImage);
      const apiKey = "929e6ec36b26823163f6d5834fd818b8";

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          { method: "POST", body: formData }
        );
        const data = await response.json();

        if(!data.success) {
          toast.error("Image upload failed!");
          setFormLoading(false);
          return;
        }

        uploadedImageURL = data.data.display_url;
        deleteURL = data.data.delete_url;
      } catch(error) {
        console.error("Image upload error:", error);
        toast.error("Image upload failed!");
        setFormLoading(false);
        return;
      }
    }

    // ==========================
    // Prepare update product object
    // ==========================
    const updateProduct = {
      productName,
      description,
      category,
      price,
      offerPrice,
      imageURL: uploadedImageURL,
      deleteURL,
    };

    // ==========================
    // PUT request to update product on server
    // ==========================
    try {
      await api.patch(`/add-item/${id}`, updateProduct); // 🔹 update: use axios baseURL instance

      toast.success("Product updated successfully!");
      setPreview(null);
      setUploadImage(null);
      productForm.reset();

      navigate("/dashboard/product-management"); // 🔹 update: redirect after update

    } catch(error) {
      console.error("Update error:", error);
      toast.error("Product update failed!");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div id="addTOItem" className="min-h-screen bg-gray-50 flex flex-col ">
      {/* ==========================
          Header
      ========================== */}
      <header className="font-medium text-center cursor-pointer bg-gradient-to-r from-cyan-700 to-blue-400 px-5 rounded text-white py-2 w-full">
        <h1 className="">Update Product</h1>
      </header>

      {/* ==========================
          Main Form
      ========================== */}
      <main className="flex-1 flex items-center justify-center">

        <form
          onSubmit={handleSubmit} // 🔹 update: connected handleSubmit
          className="bg-white w-full  p-3 md:p-10 rounded shadow-lg space-y-6"
        >
          {/* ==========================
              Product Image Section
          ========================== */}
          <div>
            <p className="text-base font-medium">Product Image</p>
            <div className="flex items-center mt-2">
              <label htmlFor="image">
                <input
                  name="image"
                  type="file"
                  id="image"
                  hidden
                  onChange={(e) => {
                    setPreview(
                      e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null
                    );
                    setUploadImage(e.target.files[0]); // 🔹 update: new file
                  }}
                />
              </label>

              <div className="border">
                <label htmlFor="image">
                  <img
                    className="max-w-24 h-24 object-cover cursor-pointer"
                    src={
                      preview ||
                      currentProduct?.imageURL || // 🔹 update: show existing image
                      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                    }
                    alt="uploadArea"
                    width={100}
                    height={100}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* ==========================
              Product Name
          ========================== */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-base font-medium" htmlFor="product-name">
              Product Name
            </label>
            <input
              id="product-name"
              name="productName"
              defaultValue={currentProduct?.productName} // 🔹 update: show current product name
              type="text"
              placeholder="Type here"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-full"
              required
            />
          </div>

          {/* ==========================
              Product Description
          ========================== */}
          <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="product-description">
              Product Description
            </label>
            <textarea
              id="product-description"
              name="description"
              defaultValue={currentProduct?.description} // 🔹 update: show current description
              rows={4}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none w-full"
              placeholder="Type here"
            ></textarea>
          </div>

          {/* ==========================
              Category
          ========================== */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={currentProduct?.category} // 🔹 update: show current category
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-full"
            >
              <option value="">Select Category</option>
              {["Electronics", "Clothing", "Book", "Accessories"].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* ==========================
              Price & Offer Price
          ========================== */}
          <div className="flex flex-wrap gap-5">
            <div className="flex-1 flex flex-col gap-1 min-w-[150px]">
              <label className="text-base font-medium" htmlFor="product-price">
                Product Price
              </label>
              <input
                id="product-price"
                name="price"
                type="number"
                defaultValue={currentProduct?.price} // 🔹 update: show current price
                placeholder="0"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-full"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1 min-w-[150px]">
              <label className="text-base font-medium" htmlFor="offer-price">
                Offer Price
              </label>
              <input
                id="offer-price"
                name="offerPrice"
                defaultValue={currentProduct?.offerPrice} // 🔹 update: show current offer price
                type="number"
                placeholder="0"
                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-full"
                required
              />
            </div>
          </div>

          {/* ==========================
              Submit Button
          ========================== */}
          {formLoading ? (
            <div>
              <button className="font-medium flex items-center justify-center border cursor-pointer bg-gradient-to-r from-cyan-700 to-blue-400 px-5 rounded text-white py-2 w-full">
                <TbFidgetSpinner className="animate-spin" />
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="font-medium cursor-pointer bg-gradient-to-r from-cyan-700 to-blue-400 px-5 rounded text-white py-2 w-full"
            >
              Update Product
            </button>
          )}
        </form>
      </main>

      {/* ==========================
          Footer
      ========================== */}
      <footer className="bg-gray-200 text-gray-700 py-4 text-center">
        &copy; 2025 My E-commerce Admin
      </footer>
    </div>
  )
}
