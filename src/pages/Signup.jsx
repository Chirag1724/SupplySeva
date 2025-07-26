import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [role, setRole] = useState("vendor");
  const navigate= useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    password: "",
    city: "",
    pincode: "",
    address: "",
    fssaiNumber: "",
    fssaiCertificate: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("role", role);
    payload.append("name", formData.name);
    payload.append("businessName", formData.businessName);
    payload.append("phone", formData.phone);
    payload.append("password", formData.password);
    payload.append("city", formData.city);
    payload.append("pincode", formData.pincode);

    if (role === "supplier") {
      payload.append("address", formData.address);
      payload.append("fssaiNumber", formData.fssaiNumber);
      if (formData.fssaiCertificate) {
        payload.append("fssaiCertificate", formData.fssaiCertificate);
      }
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Signup successful!");
      navigate("/")
      // Optional: Redirect to login
    } catch (error) {
      console.error(error);
      alert("Signup failed. Check console for details.");
    }
  };

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
        <h1 className="text-2xl font-bold mb-2 mt-36">Create your account on Supply Seva</h1>
        <p className="text-gray-500 mb-6">
          Please fill in the details to get started
        </p>

        {/* Role Toggle */}
        <div className="flex gap-4 mb-6 bg-gray-100 p-1 rounded-full w-fit">
          <button
            onClick={() => setRole("vendor")}
            className={`px-6 py-2 rounded-full transition duration-200 ${
              role === "vendor"
                ? "bg-green-500 text-white font-semibold shadow"
                : "bg-white text-gray-600"
            }`}
          >
            Vendor
          </button>
          <button
            onClick={() => setRole("supplier")}
            className={`px-6 py-2 rounded-full transition duration-200 ${
              role === "supplier"
                ? "bg-green-500 text-white font-semibold shadow"
                : "bg-white text-gray-600"
            }`}
          >
            Supplier
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Common Fields */}
          <input
            type="text"
            placeholder={role === "vendor" ? "Vendor Name" : "Supplier Name"}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Business Name"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-1/2 border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              className="w-1/2 border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Supplier Only Fields */}
          {role === "supplier" && (
            <>
              <input
                type="text"
                placeholder="Full Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="text"
                placeholder="FSSAI No."
                value={formData.fssaiNumber}
                onChange={(e) => setFormData({ ...formData, fssaiNumber: e.target.value })}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <div className="w-full">
                <label
                  htmlFor="fssai"
                  className="block text-gray-700 border-gray-400 font-semibold mb-2"
                >
                  Upload FSSAI Certificate
                </label>
                <input
                  id="fssai"
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, fssaiCertificate: e.target.files[0] })
                  }
                  className="w-full text-gray-700 bg-white border border-gray-400 rounded-lg cursor-pointer
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
