import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import All_Routes from "./Routes/All_Routes";
import AuthProver from "./AuthProver/AuthProver";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "./AuthProver/ThemeProvider";
import CartProvider from "./AuthProver/CartProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <ThemeProvider>
        <AuthProver>
          <All_Routes></All_Routes>
          <Toaster></Toaster>
        </AuthProver>
      </ThemeProvider>
    </CartProvider>
  </BrowserRouter>
);
