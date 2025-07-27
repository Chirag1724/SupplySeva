import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [role, setRole] = useState("vendor"); // default role
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

    try {
      const form = new FormData();
      form.append("role", role);
      form.append("name", formData.name);
      form.append("businessName", formData.businessName);
      form.append("phone", formData.phone);
      form.append("password", formData.password);
      form.append("city", formData.city);
      form.append("pincode", formData.pincode);

      if (role === "supplier") {
        form.append("address", formData.address);
        form.append("fssaiNumber", formData.fssaiNumber);
        if (formData.fssaiCertificate) {
          form.append("fssaiCertificate", formData.fssaiCertificate);
        }
      }

      const response = await axios.post("http://localhost:5000/api/auth/signup", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message || "Signup successful!");

      // ✅ Reset form after successful submission
      setFormData({
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
      setRole("vendor");

      // Optional: redirect to login
      // window.location.href = "/login";
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-500 via-green-600 to-green-700">
      {/* Left Illustration Section */}
      <div className="w-1/2 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-lime-200 rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-green-200 rounded-full"></div>
        </div>
        
        {/* Main Illustration Container */}
        <div className="relative z-10 max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Join Supply Seva</h1>
            <p className="text-green-100 text-lg leading-relaxed">
              Connect with the best food suppliers and grow your business with organic, fresh and quality ingredients
            </p>
          </div>
          
          {/* Illustrated Farm/Market Scene */}
          <div className="relative mx-auto w-80 h-64">
            {/* Market Stall */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-32 bg-gradient-to-b from-green-300 to-green-400 rounded-t-3xl shadow-2xl">
              {/* Canopy */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-56 h-8 bg-gradient-to-r from-lime-600 to-green-700 rounded-full shadow-lg"></div>
              
              {/* Market Sign */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-emerald-700 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">STORE</span>
              </div>
              
              {/* Vegetable Display */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                {/* Tomatoes */}
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                {/* Carrots */}
                <div className="w-3 h-6 bg-orange-500 rounded-full"></div>
                {/* Lettuce */}
                <div className="w-5 h-4 bg-green-600 rounded-full"></div>
              </div>
            </div>
            
            {/* Farmer Character */}
            <div className="absolute bottom-0 right-16 w-12 h-24">
              {/* Body */}
              <div className="absolute bottom-0 w-8 h-16 bg-green-800 rounded-t-full mx-auto left-1/2 transform -translate-x-1/2"></div>
              {/* Head */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-700 rounded-full"></div>
              {/* Hat */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-green-900 rounded-full"></div>
              {/* Arms */}
              <div className="absolute top-6 -left-1 w-3 h-8 bg-green-800 rounded-full transform -rotate-12"></div>
              <div className="absolute top-6 -right-1 w-3 h-8 bg-green-800 rounded-full transform rotate-12"></div>
            </div>
            
            {/* Vegetable Plants */}
            <div className="absolute bottom-0 left-8">
              {/* Carrot Plant */}
              <div className="w-6 h-4 bg-green-600 rounded-full"></div>
              <div className="w-2 h-8 bg-orange-600 mx-auto"></div>
              <div className="w-4 h-12 bg-green-700 mx-auto -mt-4"></div>
            </div>
            <div className="absolute bottom-0 right-8">
              {/* Leafy Green */}
              <div className="w-8 h-6 bg-green-500 rounded-full"></div>
              <div className="w-6 h-4 bg-green-600 rounded-full mx-auto -mt-2"></div>
              <div className="w-3 h-8 bg-green-700 mx-auto -mt-2"></div>
            </div>
            
            {/* Floating Vegetable Icons */}
            <div className="absolute top-8 left-8 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-red-400 rounded-full"></div>
            </div>
            <div className="absolute top-16 right-12 w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            </div>
            <div className="absolute top-4 right-4 w-7 h-7 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
            </div>
          </div>
          
          {/* Role Cards */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center text-white">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-lime-300 rounded"></div>
              </div>
              <div className="text-sm font-semibold">Vendors</div>
              <div className="text-xs text-green-100">Order Fresh Vegetables</div>
            </div>
            <div className="text-center text-white">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-green-300 rounded"></div>
              </div>
              <div className="text-sm font-semibold">Suppliers</div>
              <div className="text-xs text-green-100">List Your Fresh Produce</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-12 py-8 relative">
        {/* Lock Icon */}
        <div className="absolute top-8 right-8 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-9a2 2 0 00-2-2H7a2 2 0 00-2 2v9a2 2 0 002 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V7a3 3 0 116 0v2" />
          </svg>
        </div>

        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600 mb-8">
            Welcome! Please enter your details to get started
          </p>

          {/* Account Type Toggle */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-3">Account Type</label>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setRole("vendor")}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  role === "vendor"
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                Vendor
              </button>
              <button
                type="button"
                onClick={() => setRole("supplier")}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  role === "supplier"
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4z" clipRule="evenodd" />
                </svg>
                Supplier
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="relative">
              <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                type="text"
                placeholder={role === "vendor" ? "Vendor Name" : "Supplier Name"}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="relative">
              <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <input
                type="text"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="relative">
              <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="relative">
              <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-9a2 2 0 00-2-2H7a2 2 0 00-2 2v9a2 2 0 002 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V7a3 3 0 116 0v2" />
              </svg>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="relative flex-1">
                <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Supplier-only Fields */}
            {role === "supplier" && (
              <div className="space-y-4 pt-2 border-t border-gray-200">
                <div className="relative">
                  <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Full Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="relative">
                  <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="FSSAI No."
                    value={formData.fssaiNumber}
                    onChange={(e) => setFormData({ ...formData, fssaiNumber: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Upload FSSAI Certificate
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) =>
                        setFormData({ ...formData, fssaiCertificate: e.target.files[0] })
                      }
                      className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-green-500 file:to-green-600 file:text-white hover:file:from-green-600 hover:file:to-green-700 file:cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Sign Up
            </button>

            <div className="text-center pt-4">
              <span className="text-gray-600">Already have an account? </span>
              <a href="/login" className="text-green-500 font-semibold hover:text-green-600 transition-colors">
                Log In
              </a>
            </div>

            <p className="text-center text-gray-400 text-sm pt-6 border-t border-gray-100">
              © 2025 SupplySeva | Fresh • Natural • Organic
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}