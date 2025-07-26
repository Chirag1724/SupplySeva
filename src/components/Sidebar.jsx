import React from 'react';

export default function Sidebar() {
  return (
    <div className="w-64 p-6 bg-white shadow-md min-h-screen">
      <h2 className="text-lg font-semibold mb-6">Filters</h2>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Categories</h3>
        {['Vegetables', 'Spices', 'Grains', 'Dairy', 'Others'].map((item) => (
          <label key={item} className="flex items-center space-x-2 mb-3">
            <input type="checkbox" className="accent-green-600 w-4 h-4" />
            <span className="text-sm text-gray-700">{item}</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Price Range</h3>
        <input type="range" className="w-full accent-green-600" />
      </div>

      {/* Supplier Dropdown */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Supplier</h3>
        <select className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600">
          <option>Select Supplier</option>
          <option>Supplier 1</option>
          <option>Supplier 2</option>
        </select>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Availability</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer">
            <input type="radio" name="stock" defaultChecked className="accent-green-600 w-4 h-4" />
            <span className="text-sm text-gray-700">In Stock</span>
          </label>
          <label className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer">
            <input type="radio" name="stock" className="accent-green-600 w-4 h-4" />
            <span className="text-sm text-gray-700">Out of Stock</span>
          </label>
        </div>
      </div>
    </div>
  );
}
