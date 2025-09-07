import React from "react";


import About from "../Pages/About";
import Blog from "../Pages/Blog";
import Contact from "../Pages/Contact";
import Layout from "../Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Login from "../Auhtentication/Login";
import Register from "../Auhtentication/Register";
import User_Account from "../Auhtentication/User_Account";
import Dashboard_Layout from "../Dashboard/Dashboard_Layout";
import Admin from "../Dashboard/Admin/Admin";
import User from "../Dashboard/User/User";
import All_User from "../Dashboard/Admin/AdminPAGE/All_User";
import Customer_Management from "../Dashboard/Admin/AdminPAGE/Customer_Management";
import Order_Management from "../Dashboard/Admin/AdminPAGE/Order_Management";
import Product_Management from "../Dashboard/Admin/AdminPAGE/Product_Management";
import My_Order from "../Dashboard/User/My_Order";
import My_Profile from "../Dashboard/User/My_Profile";
import Wishlist from "../Dashboard/User/Wishlist";
import Report from "../Dashboard/Admin/AdminPAGE/Report";
import Add_item from "../Dashboard/Admin/AdminPAGE/Add_item";
import Hosting_imgBB from "../Dashboard/Admin/AdminPAGE/Hosting_imgBB";
import Update_Product from "../Dashboard/Admin/AdminPAGE/Update_Product";
import Home from "../Pages/Home/Home";
import ErrorPage from "../ErrorPage/ErrorPage";
import Product_Details from "../Pages/Home/Product/Product_Details";
import Shop from "../Pages/Shop";
import Cart from "../Pages/Home/Product/Cart/Cart";

export default function All_Routes() {
  return (
    <div>
      <Routes>

{/* normal route here */}
        <Route element={<Layout></Layout>}>

        <Route index element={<Home></Home>}></Route>

          <Route path="about" element={<About></About>}></Route>
          <Route path="shop" element={<Shop></Shop>}></Route>
          <Route path="blog" element={<Blog></Blog>}></Route>
          <Route path="contact" element={<Contact></Contact>}></Route>

          <Route path="product-details/:id" element={<Product_Details></Product_Details>}></Route>
          
          <Route path="cart/:id" element={<Cart></Cart>}></Route>



        </Route>


{/* authentication route */}
        <Route path="account" element={<User_Account></User_Account>}>
          <Route path="login" element={<Login></Login>}></Route>
          <Route path="register" element={<Register></Register>}></Route>
        </Route>


{/* dashboard route  */}
      <Route path="dashboard" element={<Dashboard_Layout></Dashboard_Layout>}>
      
      {/* admin all router */}
        <Route path="admin" element={<Admin></Admin>}></Route>
        <Route path="all-user" element={<All_User></All_User>}></Route>
        <Route path="add-item" element={<Add_item></Add_item>}></Route>
        <Route path="customer-management" element={<Customer_Management></Customer_Management>}></Route>

        <Route path="order-management" element={<Order_Management></Order_Management>}></Route>

        

        <Route path="product-management" element={<Product_Management></Product_Management>}></Route>

        {/* product details */}
        <Route path="update-product/:id" element={<Update_Product></Update_Product>}></Route>


        <Route path="report" element={<Report></Report>}></Route>
        <Route path="hosting-imgBB" element={<Hosting_imgBB></Hosting_imgBB>}></Route>


      {/* user all routes */}
        <Route path="user" element={<User></User>}></Route>
        <Route path="my-order" element={<My_Order></My_Order>}></Route>
        <Route path="my-profile" element={<My_Profile></My_Profile>}></Route>
        <Route path="wishlist" element={<Wishlist></Wishlist>}></Route>


      </Route>


      <Route path="*" element={<ErrorPage></ErrorPage>}></Route>

      </Routes>
    </div>
  );
}
