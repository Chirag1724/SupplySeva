import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Ensure you have a CSS file for global styles
import App from "./App";
import { CartProvider } from "./pages/CartContext"; // adjust the path

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
