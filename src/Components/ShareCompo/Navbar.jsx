import Hamburger from "hamburger-react";
import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; // fixed import
import { FaUserLarge } from "react-icons/fa6";
import { MyContext } from "../../AuthProver/AuthProver";
import toast from "react-hot-toast";
import Search_Popup from "../../Pages/Home/Search_Popup";

import ThemeToggle from "../../DarkMode/ThemeToggle";
import { ThemeContext } from "../../AuthProver/ThemeProvider";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  const [createAccount, setCreateAccount] = useState(false);
  const { user, setUser, logOut, loading } = useContext(MyContext);

  const {theme, toggle} = useContext(ThemeContext)
  

  const navigate = useNavigate();

  const handlerLogOut = () => {
    logOut(null);
    toast.success("Successfully Logout");
    navigate("/account/login");
  };

  const menuItem = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Blog", link: "/blog" },
  ];


  return (
    <>
      {/* overlay when click the account icon then show this */}

      <div className="">

        {createAccount && (
          <div
            onClick={() => setCreateAccount(false)}
            className="absolute bg-black/50 inset-0 backdrop-blur-[1px] "
          ></div>
        )}
      </div>
      
      <nav className="bg-white text-[var(--deepColor)] shadow-md">
        
        <div className="container  m-auto px-4 py-3 flex justify-between items-center">

          {/* Logo */}
          <div>
            <Link
              to={"/"}
              className="font-bold text-2xl text-[var(--primaryColor)]"
            >
              Notebook
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="flex  items-center  lg:gap-5 ">
            <ul className="hidden  font-medium lg:flex items-center space-x-6">
              {menuItem.map((item, index) => (
                <li key={index}>
                  <NavLink
                    onClick={() => setOpen(false)}
                    to={item.link}
                    className=" transition duration-200"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

                <div className="px-2 lg:px-0 ">
                    <ThemeToggle></ThemeToggle>
                </div>

              <div>
                <Search_Popup></Search_Popup>
              </div>

{/* dark mode */}
               

            {/* account */}

            <div className="flex relative text-[var(--primaryColor)] rounded-full items-center">

              <button
                onClick={() => setCreateAccount(!createAccount)}
                className="text-xl p-2 cursor-pointer"
              >
                <FaUserLarge />
              </button>


              <div className="absolute text-[var(--deepColor)] -right-17 lg:right-0 top-14 lg:top-12">

                {createAccount && (
                  <div className="w-35 h-40 border-0 border-s-5 p-5 border-blue-500 bg-white shadow-md">
                    <div className="flex flex-col space-y-2 items-start">
                      <button className="hover:underline">Name</button>

                      <button
                        className="hover:underline"
                        onClick={() => navigate("/account/register")}
                      >
                        {" "}
                        Account{" "}
                      </button>

                      <Link to={"/dashboard"} className="hover:underline">
                        Dashboard
                      </Link>

                      {user ? (
                        <>
                          {" "}
                          <button
                            className="hover:underline"
                            onClick={() => {
                              handlerLogOut();
                              setOpen(false);
                            }}
                          >
                            Logout
                          </button>{" "}
                        </>
                      ) : (
                        <Link to={'/account/login'}>
                          Login
                        </Link>
                      )}


                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hamburger icon */}
            <div className="lg:hidden ">
              <Hamburger toggled={open} toggle={setOpen} size={25} />
            </div>


          </div>


        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border border-gray-200 shadow h-screen absolute top-18 w-72 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="flex flex-col font-medium p-4 space-y-3">
            {menuItem.map((item, index) => (
              <li key={index}>
                <NavLink
                  onClick={() => setOpen(false)}
                  to={item.link}
                  className="block transition duration-200"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>


      </nav>{" "}
    </>
  );
}
