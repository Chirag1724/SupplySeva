import React, { useState } from "react";

export default function Signup() {
  const [role, setRole] = useState("vendor");

  return (
    <div className="flex h-screen">
      {/* Left Image Section */}
      <div className="w-1/2 h-screen bg-gray-100 flex items-center justify-center">
        <img
          src="loginimg.png"
          alt="Sign Up Illustration"
          className="max-w-md"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 flex flex-col justify-center px-16">
        <h1 className="text-2xl font-bold mb-2">Create your account on Supply Seva</h1>
        <p className="text-gray-500 mb-6">
          Please fill in the details to get started
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
          {role === "vendor" ? (
            <>
              <input
                type="text"
                placeholder="Vendor Name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="text"
                placeholder="Business Name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="w-1/2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-1/2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              
            </>
          ) : (
            <>
                <input
                  type="Supplier"
                  placeholder="Supplier Name"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              <input
                type="text"
                placeholder="Business Name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="w-1/2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-1/2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <input
                type="text"
                placeholder="FSSAI No."
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
             <div class="w-full">
            <label
                for="fssai"
                class="block text-gray-700 font-semibold mb-2"
            >
                Upload FSSAI Certificate
            </label>
            <input
                id="fssai"
                type="file"
                class="w-full text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer
                    px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 file:mr-4 file:py-2 
                    file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold
                    file:bg-green-500 file:text-white hover:file:bg-green-600"
            />
            </div>

            </>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-green-500 font-semibold">
              Log In
            </a>
          </p>

          <p className="text-center text-gray-400 text-sm mt-6">
            © 2025 SupplySeva | All rights reserved
          </p>
        </form>
      </div>
    </div>
  );
}
