import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Phone, Lock, User, Truck } from "lucide-react";

export default function Login() {
  const [role, setRole] = useState("vendor");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const url = "http://localhost:5000/api/auth/login";
      const { data } = await axios.post(url, {
        phone,
        password,
        role,
      });

      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 flex">
      {/* Left Section - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-green-600 to-emerald-600">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <img
          src="/loginimg.png"
          alt="Login Visual"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8 lg:p-12">
          <div className="max-w-lg text-center">
            <div className="mb-6 lg:mb-8">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 backdrop-blur-sm border border-white/20">
                <Lock className="w-8 h-8 lg:w-10 lg:h-10" />
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold mb-3 lg:mb-4 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-lg lg:text-xl opacity-90 leading-relaxed font-light px-4">
                Connect with the best fresh food suppliers and grow your business with quality, organic ingredients
              </p>
            </div>
            
            <div className="flex justify-center space-x-8 lg:space-x-12 mt-8 lg:mt-12">
              <div className="text-center group">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/10 rounded-xl flex items-center justify-center mb-3 lg:mb-4 mx-auto backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  <User className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <p className="text-sm font-medium opacity-90">Vendors</p>
                <p className="text-xs opacity-70 mt-1">Order Fresh Items</p>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/10 rounded-xl flex items-center justify-center mb-3 lg:mb-4 mx-auto backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  <Truck className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <p className="text-sm font-medium opacity-90">Suppliers</p>
                <p className="text-xs opacity-70 mt-1">List Fresh Produce</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-400/10 rounded-full blur-2xl"></div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-4 sm:mb-6 shadow-lg">
              <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Sign In</h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium">Welcome back! Please enter your details</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-800 block">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  type="button"
                  className={`relative flex items-center justify-center px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl font-semibold transition-all duration-300 border-2 text-sm sm:text-base ${
                    role === "vendor"
                      ? "bg-green-500 text-white border-green-500 shadow-lg shadow-green-200"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50"
                  }`}
                  onClick={() => setRole("vendor")}
                >
                  <User className="w-4 h-4 mr-1.5 sm:mr-2" />
                  Vendor
                  {role === "vendor" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                  )}
                </button>
                <button
                  type="button"
                  className={`relative flex items-center justify-center px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl font-semibold transition-all duration-300 border-2 text-sm sm:text-base ${
                    role === "supplier"
                      ? "bg-green-500 text-white border-green-500 shadow-lg shadow-green-200"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50"
                  }`}
                  onClick={() => setRole("supplier")}
                >
                  <Truck className="w-4 h-4 mr-1.5 sm:mr-2" />
                  Supplier
                  {role === "supplier" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                  )}
                </button>
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800 block">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={
                    role === "vendor" ? "Enter vendor phone number" : "Enter supplier phone number"
                  }
                  required
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white font-medium text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800 block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50 focus:bg-white font-medium text-sm sm:text-base"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 sm:py-3.5 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In to Account"
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-5 sm:mt-6 text-center space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-3 sm:px-4 bg-white text-gray-500 font-medium">New to our platform?</span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="w-full border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:border-green-300 hover:bg-green-50 hover:text-green-700 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300 text-sm sm:text-base"
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}