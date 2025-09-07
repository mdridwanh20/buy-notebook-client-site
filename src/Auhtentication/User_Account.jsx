import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { Btn, HeadingH3 } from "../Components/ShareCompo/Typography";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/ShareCompo/Navbar";

import Footer from "../Components/ShareCompo/Footer";
import Home from "../Pages/Home/Home";

export default function User_Account() {
  
  const [isOpen, setOpen] = useState(false);

  // const openModal = () => setOpen(true);
  // const closeModal = () => setOpen(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/account")) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [location.pathname]);

  
  const closeModal = () => {
    setOpen(false);
    navigate("/");
  };

  // active style function;
  const getButtonStyle = (path) => {
    const isActive = location.pathname === path;
    return `font-medium cursor-pointer bg-gradient-to-r  px-5 rounded text-white py-2
      ${
        isActive
          ? "from-cyan-700 to-blue-400"
          : "border border-teal-500 text-black! capitalize"
      }`;
  };


  return (
    <div className=" border  ">
      <Navbar></Navbar>
      <Home></Home>
      <Footer></Footer>

      <div className="flex  items-center justify-center">
        {/* modal */}

        <div className="">
          {isOpen && (
            <div
              className="fixed inset-0 border overflow-auto py-10 bg-black/40 backdrop-blur-[2px] flex items-start justify-center"
              onClick={closeModal}
            >
              <div className="m-4 border  w-[500px] relative">
                {/* Pink Glow Background */}
                <div
                  className="absolute rounded-md inset-0 z-0"
                  style={{
                    backgroundImage: `
                      radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)
                      `,
                    backgroundSize: "100% 100%",
                  }}
                />

                {/*  Content/Components */}

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="transform  transition-all duration-300 ease-in-out relative py-5 shadow"
                >
                  <div>
                    <div className="flex px-4 border-0 border-b-1 pb-3 border-gray-400 items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button className="text-2xl">
                          <FaUser />
                        </button>

                        <div className="flex text-sm flex-col ">
                          <h2>Name: </h2>
                          <h2>Profession </h2>
                        </div>
                      </div>

                      <div
                        className=" flex items-center justify-center  p-1 "
                        onClick={closeModal}
                      >
                        <button className="text-lg cursor-pointer">
                          <IoMdClose size={25} />
                        </button>
                      </div>
                    </div>

                    <div className="pt-5 flex items-center  justify-center flex-col">
                      <HeadingH3
                        className="mb-4 text-center text-[var(--deepColor)]! text-2xl font-semibold"
                        head3={"Create new account"}
                      ></HeadingH3>

                      <div className="flex  items-center gap-5 justify-between">

                        <button
                          className={getButtonStyle('/account/register')}
                          onClick={() => navigate("/account/register")}
                        >
                          Register
                        </button>

                        <button
                          className={getButtonStyle('/account/login')}
                          onClick={() => navigate("/account/login")}
                        >
                          login
                        </button>

                      </div>
                    </div>

                    <div className="">
                      <Outlet></Outlet>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
