import React from 'react';

export default function ProjectDetails() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        Home / <span className="text-gray-900 font-medium">Cinnamon Sticks</span>
      </div>

      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src="https://plus.unsplash.com/premium_photo-1723708958105-09e29205e551?q=80&w=1144&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Cinnamon Sticks"
          className="w-full max-w-sm rounded-lg object-cover"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold">Cinnamon Sticks</h1>
          <p className="text-sm text-gray-500 mt-1">Premium quality cinnamon sticks, perfect for cooking and baking.</p>
          <p className="mt-4 text-lg font-semibold">₹150/kg</p>

          <select className="mt-3 border rounded px-3 py-2">
            <option>Select Quantity</option>
            <option>1kg</option>
            <option>5kg</option>
          </select>

          <div className="mt-4 flex gap-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded">Add to Cart</button>
            <button className="bg-black text-white px-4 py-2 rounded">Order Now</button>
          </div>
        </div>
      </div>

      {/* Details & Specs */}
      <div className="mt-10">
        <h2 className="font-semibold text-lg mb-2">Details & Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <p><strong>Supplier:</strong> Spice Merchants Inc. (4.5 stars, 120 reviews)</p>
          <p><strong>Availability:</strong> In Stock</p>
          <p><strong>Available Quantity:</strong> 500 kg</p>
          <p><strong>Product ID:</strong> CIN-001</p>
          <p><strong>Pack Size:</strong> 1kg, 5kg</p>
          <p><strong>Delivery Time:</strong> 2-3 days</p>
          <p><strong>Last Updated:</strong> 2024-01-15</p>
          <p><strong>Supplier Rating:</strong> Spice Merchants Inc. logo</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8">
        <div className="flex gap-6 border-b">
          <button className="pb-2 border-b-2 border-black font-medium">Description</button>
          <button className="pb-2 text-gray-500">Supplier Info</button>
          <button className="pb-2 text-gray-500">Nutritional Info</button>
          <button className="pb-2 text-gray-500">User Reviews</button>
        </div>
        <p className="mt-4 text-gray-700">
          Our cinnamon sticks are sourced directly from the finest farms...
        </p>
      </div>

      {/* You May Also Like */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">You May Also Like</h3>
        <div className="flex gap-4 overflow-x-auto">
          {/* Example Card */}
          {[
            { name: 'Cloves', price: '₹120/kg', img: '/cloves.png' },
            { name: 'Cardamom Pods', price: '₹250/kg', img: '/cardamom.png' },
            { name: 'Turmeric Powder', price: '₹80/kg', img: '/turmeric.png' }
          ].map((item, index) => (
            <div key={index} className="w-40 bg-white shadow rounded p-2">
              <img src={item.img} alt={item.name} className="w-full h-24 object-cover rounded" />
              <div className="mt-2 text-sm font-medium">{item.name}</div>
              <div className="text-gray-500">{item.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Guidelines */}
      <div className="mt-10 text-sm text-gray-600 border-t pt-4">
        <strong>Image Upload Guidelines:</strong> Please upload high-quality product images with a max resolution of 2000×2000px and file size &lt;5MB...
      </div>
    </div>
  );
}
