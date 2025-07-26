import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("vendor");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = role === "vendor" ? "/api/vendor/login" : "/api/supplier/login";

      const { data } = await axios.post(url, {
        emailOrPhone,
        password,
      });

      // Save token or session data if needed
      console.log("Login Success:", data);

      // Redirect based on role
      if (role === "vendor") navigate("/vendor-dashboard");
      else navigate("/supplier-dashboard");

    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Image Section */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src="loginimg.png"
          alt="Login Illustration"
          className="max-w-md"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 flex flex-col justify-center px-16">
        <h1 className="text-2xl font-bold mb-2">Welcome back to Supply Seva</h1>
        <p className="text-gray-500 mb-6">
          Please log in to continue ordering with your suppliers
        </p>

        {/* Role Toggle */}
        <div className="flex gap-6 mb-4">
          <button
            onClick={() => setRole("vendor")}
            className={`pb-2 border-b-2 ${
              role === "vendor"
                ? "border-green-500 text-green-500 font-semibold"
                : "border-transparent text-gray-500"
            }`}
          >
            Vendor
          </button>
          <button
            onClick={() => setRole("supplier")}
            className={`pb-2 border-b-2 ${
              role === "supplier"
                ? "border-green-500 text-green-500 font-semibold"
                : "border-transparent text-gray-500"
            }`}
          >
            Supplier
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            placeholder={
              role === "vendor"
                ? "Vendor Email or Phone"
                : "Supplier Email or Phone"
            }
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <div className="flex justify-between items-center text-sm text-gray-500">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-green-500">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Log In
          </button>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-1" />
            <span className="mx-4 text-gray-400">OR</span>
            <hr className="flex-1" />
          </div>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-green-500 font-semibold">
            Sign Up
          </a>
        </p>

        <p className="text-center text-gray-400 text-sm mt-6">
          © 2025 SupplySeva | All rights reserved
        </p>
      </div>
    </div>
  );
}
