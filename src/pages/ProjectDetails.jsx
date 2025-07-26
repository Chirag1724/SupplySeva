import React, {useState} from "react";
export default function ProductDetails() {
    const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-green-600">Home</a> /
        <a href="/spices" className="hover:text-green-600"> Spices</a> /
        <span className="text-gray-700 font-medium"> Cinnamon Sticks</span>
      </nav>

      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-lg p-6 shadow">
        {/* Left: Product Image */}
        <div className="flex justify-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1726072396309-57f97433e1d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2lubmFtb24lMjBzdGlja3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Cinnamon Sticks"
            className="w-80 h-80 object-cover rounded-xl "
          />
        </div>

        {/* Right: Product Info */}
        <div>
          <h1 className="text-4xl font-semibold text-gray-900 mb-3">Cinnamon Sticks</h1>
          <p className="text-gray-600 text-lg mb-4">Premium quality cinnamon sticks, perfect for cooking and baking.</p>
          <p className="text-gray-700 mb-2"><strong>Category:</strong> Spices</p>
          <p className="text-green-600 text-2xl font-bold mb-6">₹150 / kg</p>

          {/* Quantity Selector */}
          <select className="border rounded-lg px-4 py-3 mb-6 w-44 focus:ring-2 focus:ring-green-400">
            <option>Select Quantity</option>
            <option>1 kg</option>
            <option>5 kg</option>
          </select>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="bg-green-500 text-white px-8 py-3 rounded-lg shadow hover:bg-green-600 transition">
              Add to Cart
            </button>
            <button className="border border-green-500 text-green-500 px-8 py-3 rounded-lg hover:bg-green-100 transition">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Details & Specifications */}
      <div className="mt-12">
  <h2 className="text-2xl font-semibold mb-6">Details & Specifications</h2>
  <div className="m-6 rounded-lg shadow p-6">
    {/* Row 1 */}
    <div className="flex justify-between py-4 border-b border-gray-300">
      <div className="ml-28 ">
        <p className="text-gray-500 mb-4 text-sm">Supplier:</p>
        <p className="text-gray-800 font-medium">
          Spice Merchants Inc. (4.5 stars, 120 reviews)
        </p>
      </div >
      <div className="mr-56 ">
        <p className="text-gray-500 mb-4 text-sm">Availability:</p>
        <p className="text-gray-800 font-medium">In Stock</p>
      </div>
    </div>

    {/* Row 2 */}
    <div className="flex justify-between py-4 border-b border-gray-300">
      <div className="ml-28 ">
        <p className="text-gray-500  mb-4 text-sm">Available Quantity:</p>
        <p className="text-gray-800 font-medium">500 kg</p>
      </div>
      <div className="mr-56 ">
        <p className="text-gray-500 mb-4 text-sm">Product ID:</p>
        <p className="text-gray-800 font-medium">CIN-001</p>
      </div>
    </div>

    {/* Row 3 */}
    <div className="flex justify-between py-4 border-b border-gray-300">
      <div className="ml-28 ">
        <p className="text-gray-500 mb-4 text-sm">Pack Size Options:</p>
        <p className="text-gray-800 font-medium">1kg, 5kg</p>
      </div>
      <div className="mr-52 ">
        <p className="text-gray-500 mb-4 text-sm">Delivery Time:</p>
        <p className="text-gray-800 font-medium">2-3 days</p>
      </div>
    </div>

    {/* Row 4 */}
    <div className="flex justify-between py-4 ">
      <div className="ml-28 ">
        <p className="text-gray-500 mb-4 text-sm">Last Updated:</p>
        <p className="text-gray-800 font-medium">2024-01-15</p>
      </div>
      <div className="mr-28 ">
        <p className="text-gray-500 mb-4 text-sm">Supplier Rating:</p>
        <p className="text-gray-800 font-medium">Spice Merchants Inc. logo</p>
      </div>
    </div>
  </div>
</div>


      <div className="mt-10">
      {/* Tab Buttons */}
      <div className="border-b flex gap-8 text-lg font-medium">
        {[
          { id: "description", label: "Description" },
          { id: "supplier", label: "Supplier Info" },
          { id: "nutrition", label: "Nutritional Info" },
          { id: "reviews", label: "User Reviews" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 transition ${
              activeTab === tab.id
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-500 hover:text-green-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 text-gray-600 leading-relaxed">
        {activeTab === "description" && (
          <p>
            Our cinnamon sticks are sourced directly from the finest farms,
            ensuring the highest quality and aroma.
          </p>
        )}
        {activeTab === "supplier" && (
          <p>
            Supplier: Spice Merchants Inc. (4.5 stars, 120 reviews). Known for
            quality and timely delivery.
          </p>
        )}
        {activeTab === "nutrition" && (
          <p>
            Nutritional Info: Rich in antioxidants, zero trans fat, and great
            for metabolism.
          </p>
        )}
        {activeTab === "reviews" && (
          <p>
            User Reviews: “Amazing quality! Fresh and aromatic cinnamon sticks.”
          </p>
        )}
      </div>
    </div>

      {/* Recommended Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Cloves", price: "₹210/kg", image: "https://plus.unsplash.com/premium_photo-1722945788534-7dc8af951829?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdmVzfGVufDB8fDB8fHww" },
            { name: "Cardamom Pods", price: "₹250/kg", image: "https://images.unsplash.com/photo-1701190589658-696aa4f04ea3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyZGFtb20lMjBwb2RzfGVufDB8fDB8fHww" },
            { name: "Turmeric Powder", price: "₹180/kg", image: "https://plus.unsplash.com/premium_photo-1726072356922-922bbbc59cf0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHR1cm1lcmljfGVufDB8fDB8fHww" }
          ].map((item, index) => (
            <div key={index} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
              <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
              <div className="p-3">
                <p className="font-semibold">{item.name}</p>
                <p className="text-green-600">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Upload Guidelines */}
      <div className="mt-10 bg-gray-100 p-6 rounded-lg text-gray-700 text-sm">
        <h3 className="font-semibold text-lg mb-2">Image Upload Guidelines</h3>
        <p>
          Please upload high-quality product images (max 2000×2000px, 5MB). Clear images help customers make informed decisions.
        </p>
      </div>
    </div>
  );
}
