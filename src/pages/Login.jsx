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
      const response = await axios.post(url, { phone, password, role });

      const { token, user } = response.data;
     console.log("Logged-in User ID:", user._id);
console.log("Role:", user.role);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "vendor") {
        navigate("/home");
      } else if (user.role === "supplier") {
        navigate("/productlist");
      }

      window.alert("Login successful!");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please try again.");
      window.alert("Login failed. Check phone and password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 flex">
      {/* Left Section */}
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
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
                <Lock className="w-8 h-8" />
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent mb-3">
                Welcome Back
              </h1>
              <p className="text-lg opacity-90 leading-relaxed font-light">
                Connect with the best fresh food suppliers and grow your business with quality, organic ingredients
              </p>
            </div>
            <div className="flex justify-center space-x-12 mt-10">
              <div className="text-center group">
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-4 mx-auto backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition">
                  <User className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium opacity-90">Vendors</p>
                <p className="text-xs opacity-70">Order Fresh Items</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-4 mx-auto backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition">
                  <Truck className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium opacity-90">Suppliers</p>
                <p className="text-xs opacity-70">List Fresh Produce</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-sm text-gray-600 font-medium">Welcome back! Please enter your details</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Switch */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-800 block">Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                {["vendor", "supplier"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`relative flex items-center justify-center px-4 py-3 rounded-xl font-semibold border-2 transition-all text-sm ${
                      role === r
                        ? "bg-green-500 text-white border-green-500 shadow-lg"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50"
                    }`}
                  >
                    {r === "vendor" ? <User className="w-4 h-4 mr-2" /> : <Truck className="w-4 h-4 mr-2" />}
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800 block">Phone Number</label>
              <div className="relative">
                <Phone className="absolute top-3.5 left-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="Enter your phone number"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 bg-gray-50 font-medium"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800 block">Password</label>
              <div className="relative">
                <Lock className="absolute top-3.5 left-3 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 bg-gray-50 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3.5 right-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing In..." : "Sign In to Account"}
            </button>
          </form>

          {/* Go to Signup */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">New to our platform?</p>
            <button
              onClick={() => navigate("/signup")}
              className="mt-2 text-green-600 hover:underline font-medium text-sm"
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
