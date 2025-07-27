import React, { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';

const Sidebar = ({ onFilterChange, cartCount }) => {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    availability: 'all',
    suppliers: [],
    onlyDiscount: false
  });

  const suppliers = ['Local Farms', 'Organic Suppliers', 'Premium Spice Co', 'Vegetable Hub'];

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value);
    const newFilters = { ...filters, priceRange: [0, newPrice] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAvailabilityChange = (availability) => {
    const newFilters = { ...filters, availability };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSupplierChange = (supplier) => {
    const newSuppliers = filters.suppliers.includes(supplier)
      ? filters.suppliers.filter(s => s !== supplier)
      : [...filters.suppliers, supplier];
    
    const newFilters = { ...filters, suppliers: newSuppliers };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDiscountChange = (e) => {
    const newFilters = { ...filters, onlyDiscount: e.target.checked };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const newFilters = {
      categories: [],
      priceRange: [0, 1000],
      availability: 'all',
      suppliers: [],
      onlyDiscount: false
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-64 p-6 bg-white shadow-md min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        {Object.values(filters).some(filter => 
          Array.isArray(filter) ? filter.length > 0 : 
          typeof filter === 'object' ? filter[1] !== 1000 : 
          filter !== 'all' && filter !== false
        ) && (
          <button 
            onClick={clearAllFilters}
            className="text-xs text-green-600 hover:text-green-800"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Categories</h3>
        {['Vegetables', 'Spices', 'Grains', 'Dairy', 'Others'].map((category) => (
          <label key={category} className="flex items-center space-x-2 mb-3">
            <input
              type="checkbox"
              checked={filters.categories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="accent-green-600 w-4 h-4"
            />
            <span className="text-sm text-gray-700">{category}</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Price Range</h3>
          <span className="text-xs text-green-600">₹0 - ₹{filters.priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          step="50"
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
          className="w-full accent-green-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹0</span>
          <span>₹1000</span>
        </div>
      </div>

      {/* Discount */}
      <div className="mb-8">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filters.onlyDiscount}
            onChange={handleDiscountChange}
            className="accent-green-600 w-4 h-4"
          />
          <span className="text-sm text-gray-700">Discounted Items Only</span>
        </label>
      </div>

      {/* Suppliers */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Suppliers</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {suppliers.map((supplier) => (
            <label key={supplier} className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={filters.suppliers.includes(supplier)}
                onChange={() => handleSupplierChange(supplier)}
                className="accent-green-600 w-4 h-4"
              />
              <span className="text-sm text-gray-700">{supplier}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Availability</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer">
            <input
              type="radio"
              name="availability"
              checked={filters.availability === 'all'}
              onChange={() => handleAvailabilityChange('all')}
              className="accent-green-600 w-4 h-4"
            />
            <span className="text-sm text-gray-700">All Items</span>
          </label>
          <label className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer">
            <input
              type="radio"
              name="availability"
              checked={filters.availability === 'in-stock'}
              onChange={() => handleAvailabilityChange('in-stock')}
              className="accent-green-600 w-4 h-4"
            />
            <span className="text-sm text-gray-700">In Stock</span>
          </label>
          <label className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer">
            <input
              type="radio"
              name="availability"
              checked={filters.availability === 'out-of-stock'}
              onChange={() => handleAvailabilityChange('out-of-stock')}
              className="accent-green-600 w-4 h-4"
            />
            <span className="text-sm text-gray-700">Out of Stock</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;