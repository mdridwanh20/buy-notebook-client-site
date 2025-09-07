import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaShoppingCart,
  FaBox,
  FaRegEye,
  FaComments,
  FaChartBar,
} from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdNoteAdd } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { MyContext } from "../AuthProver/AuthProver";
import toast from "react-hot-toast";
import useRole from "../Hook/useRole";
import Loading from "../Components/ShareCompo/Loading";
import useUser from "../Hook/useUser";

// ✅ Reusable component for stats card
const StatsCard = ({ title, value, color }) => (
  <div className={`bg-white shadow-md rounded-lg p-4 border-l-4 ${color}`}>
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-xl font-bold text-gray-800">{value}</p>
  </div>
);


// ✅ Reusable component for quick link button
const QuickLink = ({ path, text, color }) => (
  <Link
    to={path}
    className={`px-4 py-2 rounded shadow text-white ${color} hover:opacity-90`}
  >
    {text}
  </Link>
);

export default function Dashboard_Layout() {
  const { user, logOut } = useContext(MyContext);
  const email = user?.email;
  const { isAdmin, isUser } = useRole(email);
  const { userData } = useUser();

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Logout
  const handlerLogout = () => {
    logOut(null);
    navigate("/account/login");
    toast.success("Successfully Logout");
  };

  // Dashboard routes
  const adminRoutes = [
    { name: "Add-item", path: "/dashboard/add-item", icon: <MdNoteAdd /> },
    { name: "All Users", path: "/dashboard/all-user", icon: <FaUsersGear /> },
    {
      name: "Customer Management",
      path: "/dashboard/customer-management",
      icon: <FaUsers />,
    },
    {
      name: "Order Management",
      path: "/dashboard/order-management",
      icon: <FaShoppingCart />,
    },
    {
      name: "Hosting ImgBB",
      path: "/dashboard/hosting-imgBB",
      icon: <FaShoppingCart />,
    },
    {
      name: "Product Management",
      path: "/dashboard/product-management",
      icon: <FaBox />,
    },
    { name: "Report", path: "/dashboard/report", icon: <FaChartBar /> },
  ];

  const userRoutes = [
    // { name: "Dashboard", path: "/dashboard/user", icon: <FaTachometerAlt /> },
    {
      name: "My Orders",
      path: "/dashboard/my-order",
      icon: <FaShoppingCart />,
    },
    { name: "My Profile", path: "/dashboard/my-profile", icon: <FaRegEye /> },
    { name: "Wishlist", path: "/dashboard/wishlist", icon: <FaComments /> },
  ];

  const routes = isAdmin ? adminRoutes : isUser ? userRoutes : [];

  if (!routes.length) {
    return (
      <div className="">
        <Loading />
      </div>
    );
  }

  const fixButton = [
    { name: "Home", path: "/", icon: <FaTachometerAlt /> },
    { name: "Shop", path: "/", icon: <FaShoppingCart /> },
    { name: "Contact", path: "/contact", icon: <FaComments /> },
  ];


  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute inset-0 bg-black/40 z-30 md:hidden"
        />
      )}
      <div
        className={`
        fixed md:relative z-50 top-0 left-0 h-full bg-white border-r border-gray-300
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300
        md:w-64 w-64 flex flex-col lg:pt-0 pt-5
      `}
      >
        {/* Logo */}
        <div className="lg:block hidden px-4 py-5">
          <Link
            to={"/"}
            className="font-bold text-2xl text-[var(--primaryColor)]"
          >
            Notebook
          </Link>
        </div>

        {/* Dynamic Sidebar Links */}
        <div className="flex-1 pb-10">
          {routes.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 transition-all duration-300
                ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                    : "hover:bg-gray-100/90 text-gray-700"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <p>{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Static Links */}
        <div className="mt-auto pb-5">
          {fixButton.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 transition-all duration-300
                ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                    : "hover:bg-gray-100/90 text-gray-700"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <p>{item.name}</p>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex border items-center justify-between px-4 md:px-8 border-b border-gray-300 py-5 lg:py-2 bg-white">
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-2xl text-[var(--primaryColor)] flex items-center cursor-pointer"
            >
              <TfiMenuAlt />
            </button>
          </div>

          <div className="flex lg:pt-6 justify-end lg:justify-between lg:w-full items-center gap-3 md:gap-5">
            <p className="hidden md:block font-medium">
              {isAdmin ? "Hi! Admin" : "Hi! User"}
            </p>
            <button
              onClick={handlerLogout}
              className="border cursor-pointer rounded-full text-sm px-3 md:px-4 py-1"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="px-6 py-6 bg-gradient-to-r from-indigo-50 to-indigo-100 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--primaryColor)]">
                {isAdmin ? "Welcome back, Admin 👋" : "Welcome back, User 👋"}
              </h1>
              <p className="text-gray-600 mt-1">
                Hope you're having a great day! Here’s what’s happening today.
              </p>
            </div>
            <div className="text-gray-700 text-sm flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <FaChartBar className="text-indigo-500" />
              {new Date().toLocaleDateString("en-Us", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isAdmin && (
            <StatsCard
              title="Total Users"
              value={userData.length}
              color="border-indigo-500"
            />
          )}

          <StatsCard
            title="Orders Today"
            value={isAdmin ? "--" : "--"}
            color="border-green-500"
          />

          <StatsCard
            title="Pending Tasks"
            value="--"
            color="border-yellow-500"
          />

          <StatsCard title="wishlist" value="---" color="border-teal-500" />

          {isUser && (
            <StatsCard
              title="Wishlist Items"
              value="--"
              color="border-red-500"
            />
          )}
        </div>

        {/* Quick Links */}
        <div className="px-6 mt-6 flex flex-wrap gap-4">
          {isAdmin && (
            <>
              <QuickLink
                path="/dashboard/add-item"
                text="Add Product"
                color="bg-indigo-600"
              />
              <QuickLink
                path="/dashboard/order-management"
                text="View Orders"
                color="bg-green-500"
              />
            </>
          )}
          {isUser && (
            <QuickLink
              path="/dashboard/my-profile"
              text="Edit Profile"
              color="bg-teal-500"
            />
          )}
        </div>

        {/* Recent Activity / Empty State */}
        <div className="px-6 mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">Recent Activity</h3>
          <div className="bg-white shadow rounded-lg p-4">
            {isAdmin ? (
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  New user registered:{" "}
                  <span className="font-semibold bg-yellow-200 px-2">
                    {" "}
                    {user?.email}{" "}
                  </span>
                </li>
                <li>Order #1234 placed by Sarah</li>
                <li>User updated profile: Mike</li>
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center mt-10 text-gray-400">
                <svg
                  className="w-16 h-16 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7h18M3 12h18M3 17h18"
                  />
                </svg>
                <p>
                  No activity yet. Start by exploring products or placing your
                  first order!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Nested Page Content */}
        <div className="px-3 py-3 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
