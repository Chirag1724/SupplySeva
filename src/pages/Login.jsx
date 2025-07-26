import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [role, setRole] = useState("vendor");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
     const url = "http://localhost:5000/api/auth/login";

      const { data } = await axios.post(url, {
        phone,
        password,
      });

      // You can store token or user data if returned by backend
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect to dashboard/home page after login
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 h-screen bg-gray-100 flex items-center justify-center">
        <img
          src="/loginimg.png"




      {/* Right Form Section */}

      <div className="w-1/2 flex flex-col justify-center px-10">
        <h2 className="text-4xl font-bold mb-6 text-green-600">Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Role selection */}
          <div className="flex space-x-4">
            <button
              type="button"
              className={`px-4 py-2 rounded ${
                role === "vendor"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setRole("vendor")}
            >
              Vendor
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded ${
                role === "supplier"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setRole("supplier")}
            >
              Supplier
            </button>
          </div>

          {/* Phone */}
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={
              role === "vendor" ? "Vendor Phone Number" : "Supplier Phone Number"
            }
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Login
          </button>
        </form>

     
      </div>
    </div>
  );
}
