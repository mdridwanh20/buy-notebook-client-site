import React from "react";

import Navbar from "../Components/ShareCompo/Navbar";
import Footer from "../Components/ShareCompo/Footer";
import { Outlet } from "react-router-dom";
import Plan from "../../Plan";

export default function Layout() {
  return (
    <div>
      <div className="min-h-screen w-full relative">
        {/* Magenta Orb Grid Background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "white",
            backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(13, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 162, 193, 0.2), transparent 60%)
        
   `,
          }}
        />
        {/* Your Content/Components */}

        <div className="z-10">
          
          <div>
            <Navbar></Navbar>
          </div>

          <div>
            <Outlet></Outlet>
          </div>

          <div>
            <Footer></Footer>
          </div>

          {/* <Plan></Plan> */}

        </div>

      </div>
    </div>
  );
}
