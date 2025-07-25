import React, { useState } from "react";

export default function Login() {
  const [role, setRole] = useState("vendor");

  return (
    <div className="flex h-screen">
      {/* Left Image Section */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src="loginimg.png"
          alt="Street Vendor"
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
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">
              Mobile number or Email
            </label>
            <input
              type="text"
              placeholder="Enter your mobile number or email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password or OTP</label>
            <input
              type="password"
              placeholder="Enter your password or OTP"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

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
            Login
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-1" />
            <span className="mx-4 text-gray-400">OR</span>
            <hr className="flex-1" />
          </div>

          <button
            type="button"
            className="w-full border py-2 rounded-lg flex justify-center items-center hover:bg-gray-50"
          >
            Continue with Google
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-green-500 font-semibold">
            Sign up
          </a>
        </p>

        <p className="text-center text-gray-400 text-sm mt-6">
          © 2025 SupplySeva | All rights reserved
        </p>
      </div>
    </div>
  );
}
