import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Leaf, Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLogout = () => {
    // You can add any logout logic here (like clearing tokens, etc.)
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-xl">
              <Leaf className="text-white" size={20} />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
              Supply Seva
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Cart Button */}
            <button 
              onClick={handleCartClick}
              className="relative p-3 hover:bg-gray-100 rounded-xl transition-colors group"
            >
              <ShoppingCart className="text-gray-600 group-hover:text-green-600" size={20} />
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                3
              </span>
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-xl"
              >
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Profile"
                  className="w-10 h-10 rounded-xl object-cover border-2 border-gray-200 hover:border-green-500 transition-colors"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <User size={16} className="mr-3 text-gray-400" />
                    My Profile
                  </button>
                  <button 
                    onClick={handleCartClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <ShoppingCart size={16} className="mr-3 text-gray-400" />
                    My Orders
                  </button>
                  <hr className="my-2 border-gray-100" />
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 rounded-xl text-gray-600 hover:text-green-600 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
    

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100">
          <div className="px-6 py-4 space-y-3">
            {/* Mobile Cart */}
            <button 
              onClick={handleCartClick}
              className="flex items-center justify-between w-full p-3 text-gray-700 hover:bg-gray-50 rounded-xl"
            >
              <div className="flex items-center">
                <ShoppingCart size={20} className="mr-3 text-gray-400" />
                <span>Shopping Cart</span>
              </div>
              <span className="bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                3
              </span>
            </button>

            {/* Mobile Profile Section */}
            <div className="border-t border-gray-100 pt-3">
              <div className="flex items-center mb-3 px-3">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-lg object-cover border border-gray-200 mr-3"
                />
                <span className="text-gray-700 font-medium">Your Account</span>
              </div>
              
              <button className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-50 rounded-xl">
                <User size={20} className="mr-3 text-gray-400" />
                <span>My Profile</span>
              </button>
              
              <button 
                onClick={handleCartClick}
                className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-50 rounded-xl"
              >
                <ShoppingCart size={20} className="mr-3 text-gray-400" />
                <span>My Orders</span>
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-xl"
              >
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}