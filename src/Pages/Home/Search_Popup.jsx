import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import useAddItem from "../../Hook/useAddItem";
import { FiSearch } from "react-icons/fi";

export default function Search_Popup() {
  // state : control popup open / close
  const [isOpen, setOpen] = useState(false);

  // state : search input text
  const [query, setQuery] = useState("");

  // ==========================
  // Get all products from hook
  // ==========================
  const { addItem } = useAddItem();

  // ==========================
  // FILTER PRODUCTS BASED ON QUERY
  // ==========================
 
  const filtered = addItem.filter((product) =>
    Object.values(product)
    .join(' ')
    .toLowerCase()
    .includes(query.toLowerCase())

  );

  
  return (
    <div className="lg:px-1  px-2">

      {/* search button */}
    <div className=" flex items-center justify-center">
        <button
        className="text-[22px] text-gray-500   cursor-pointer"
        onClick={() => setOpen(true)}
      >
       <FiSearch />
      </button>
    </div>

      {isOpen && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
        >
          {/* popup box */}
          <div
            // CHANGE: stopPropagation to prevent closing when clicking inside popup
            onClick={(e) => e.stopPropagation()}
            className="max-w-xl  m-auto mt-10 px-5 "
          >
            {/* close button */}
            <div className="text-end py-5">
              <button
                className="text-xl p-2 cursor-pointer bg-white rounded-full"
                onClick={() => setOpen(false)}
              >
                <MdClose />
              </button>
            </div>

            {/* search input */}
            <div className="flex m-auto items-center h-12 w-full max-w-md text-sm text-gray-500 bg-white border border-gray-500/30 rounded">
              <input
                className="outline-none px-5 bg-transparent h-full w-full"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)} // CHANGE: added onChange to update query
                placeholder="Typing here..."
                autoFocus
                list="suggestions"
              />
              <button type="button" className="text-2xl pe-3">
                <IoSearchOutline />
              </button>
            </div>


            {/* search results */}
            {query && (
              <ul className="mt-3  max-w-md m-auto px-5 py-10  divide-y max-h-60 overflow-auto bg-white rounded shadow">

                {filtered.length > 0 ? (
                  filtered.map((product) => (
                    <li
                      key={product._id.$oid} // CHANGE: use product _id as key
                      className="p-2 border-b border-gray-300 cursor-pointer flex items-center gap-3"
                      onClick={() => {
                        setQuery(product.productName); // CHANGE: set input to clicked product
                        setOpen(false); // CHANGE: close popup after click
                      }}
                    >
                      {/* CHANGE: show product image */}
                      <img
                        src={product.imageURL}
                        alt={product.productName}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span>{product.productName}</span>
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-center text-gray-500">No results found</li>
                )}
              </ul>
            )}
            

          </div>
        </div>
      )}
    </div>
  );
}
