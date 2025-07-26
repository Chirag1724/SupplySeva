import React from 'react';
import { Search, ShoppingCart } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      {/* Logo / App Name */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold"> Supply Seva</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        </div>

        {/* Cart */}
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <ShoppingCart />
        </button>

        {/* Profile Image */}
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="profile"
          className="w-9 h-9 rounded-full object-cover"
        />
      </div>
    </div>
  );
}
