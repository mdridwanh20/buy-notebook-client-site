import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../Hook/AxiosUrl";
import { data, useNavigate } from "react-router";
import { TbFidgetSpinner } from "react-icons/tb";
import { MyContext } from "../../../AuthProver/AuthProver";


const Add_item = () => {
  
  const navigate = useNavigate();
  const { loading } = useContext(MyContext);

  // ==========================
  // State variables
  // ==========================
  const [preview, setPreview] = useState(null); // For showing image preview
  const [uploadImage, setUploadImage] = useState(null); // Stores the selected file
  const [imageURL, setImageURL] = useState(null); // Stores the uploaded image URL from ImgBB

  const [formLoading, setFormLoading] = useState(false);

  // ==========================
  // Form submit function
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setFormLoading(true);

    // ==========================
    // Get values from form inputs
    // ==========================
    const productForm = e.target;

    const productName = productForm.productName.value;
    const description = productForm.description.value;
    const category = productForm.category.value;
    const price = productForm.price.value;
    const offerPrice = productForm.offerPrice.value;

    // const image = e.target.image.files[0]; // File input

    // ==========================
    // Check if user selected an image
    // ==========================
    if (!uploadImage) {
      toast.error("Please select an image first!");
      setFormLoading(false);
      return;
    }

    // ==========================
    // Prepare FormData to upload image
    // ==========================
    const formData = new FormData();
    formData.append("image", uploadImage);

    const apiKey = "929e6ec36b26823163f6d5834fd818b8";

    try {
      // ==========================
      // POST request to ImgBB API
      // ==========================

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!data.success) {
        console.error("ImgBB error:", data);
        toast.error("Image upload failed!");
        setFormLoading(false);
        return;
      }

      // ==========================
      // Save uploaded image URL to state
      // ==========================

      setImageURL(data.data.display_url);
      console.log("Image URL:", uploadImage);

      // ==========================
      // Log form data including uploaded image URL
      // ==========================

      const productData = {
        productName,
        description,
        category,
        price,
        offerPrice,
        imageURL: data.data.display_url,
        deleteURL: data.data.delete_url,
      };

      console.log(productData);

      // send to sever data

      // send to data on mongodb
      api
        .post("/add-item", productData)
        .then((res) => {
          console.log("user saved to mongodb", res.data);
          // toast.success("response server");
          navigate("/dashboard/product-management");
          console.log("response server");
        })

        .catch((err) => {
          console.error("MongoDB error:", err.message);
          setFormLoading(false);
        });

      toast.success("Product added successfully!");

      // ==========================
      // Clean up preview and reset form
      // ==========================
      setPreview(null);
      setUploadImage(null);
      productForm.reset();
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Image upload failed!");
    }
  };

  




  return (

    <div id="addTOItem" className="min-h-screen bg-gray-50 flex flex-col ">
      {/* ==========================
          Header
      ========================== */}
      <header className="font-medium text-center cursor-pointer bg-gradient-to-r from-cyan-700 to-blue-400 px-5 rounded text-white py-2 w-full">
        <h1 className="">Add Product</h1>
      </header>

      {/* ==========================
          Main Form
      ========================== */}
      <main className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
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
                      e.target.files[0]
                        ? URL.createObjectURL(e.target.files[0])
                        : null
                    );
                    setUploadImage(e.target.files[0]);
                  }}
                />
              </label>

              <div className="border">
                <label htmlFor="image">
                  <img
                    className="max-w-24 h-24 object-cover cursor-pointer"
                    src={
                      preview ||
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
            <label
              className="text-base font-medium"
              htmlFor="product-description"
            >
              Product Description
            </label>
            <textarea
              id="product-description"
              name="description"
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
            <>
              {" "}
              <div className="">
                <button className="font-medium flex items-center justify-center border cursor-pointer bg-gradient-to-r from-cyan-700 to-blue-400 px-5 rounded text-white py-2 w-full">
                  {" "}
                  <TbFidgetSpinner className="animate-spin" />{" "}
                </button>
              </div>{" "}
            </>
          ) : (
            <>
              {" "}
              <button
                type="submit"
                className="font-medium cursor-pointer bg-gradient-to-r from-cyan-700 to-blue-400 px-5 rounded text-white py-2 w-full"
              >
                Submit Form
              </button>
            </>
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
  );
};

export default Add_item;
