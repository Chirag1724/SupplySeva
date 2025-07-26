import React, { useState } from "react";

export default function VendorProfile() {
  const [editing, setEditing] = useState(false);
  const [vendor, setVendor] = useState({
    name: "Raju Chaat Bhandar",
    email: "rajuvendor@gmail.com",
    phone: "+91 9876543210",
    city: "Lucknow",
    pincode: "226001",
    address: "123, Noida, New Delhi",
    vendorType: "Street Food",
    rating: 4.7,
    totalOrders: 128,
    joinedOn: "Jan 2024",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=600",
  });

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* LEFT COLUMN */}
      <div className="col-span-1 space-y-6">
        {/* Profile Card */}
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <img
            src={vendor.image}
            alt={vendor.name}
            className="w-24 h-24 rounded-full border-4 border-green-400 mx-auto mb-4"
          />
          <h1 className="text-xl font-bold">{vendor.name}</h1>
          <p className="text-gray-500">{vendor.vendorType}</p>
          <div className="flex justify-center gap-3 mt-2">
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
              ⭐ {vendor.rating}
            </span>
            <span className="text-gray-600">Since {vendor.joinedOn}</span>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
          <div className="space-y-3">
            <button className="w-full flex justify-between px-4 py-2 border rounded hover:bg-gray-50">
              Change Password <span className="text-gray-400">›</span>
            </button>
            <button className="w-full flex justify-between px-4 py-2 border rounded hover:bg-gray-50">
              Manage Notifications <span className="text-gray-400">›</span>
            </button>
            <button className="w-full flex justify-between px-4 py-2 border rounded hover:bg-gray-50">
              Contact Support <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-2 space-y-6">
        {/* Profile Info */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="grid grid-cols-2 gap-4">
            {["name", "email", "phone", "city", "address"].map((field) => (
              <div key={field}>
                <label className="block text-gray-600 mb-1 capitalize">
                  {field}
                </label>
                <input
                  name={field}
                  value={vendor[field]}
                  onChange={handleChange}
                  readOnly={!editing}
                  className={`w-full border rounded px-3 py-2 ${
                    editing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
            ))}
          </div>
          {editing ? (
            <button
              onClick={handleSave}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4">#12345</td>
                <td>Tomatoes (10kg)</td>
                <td>₹500</td>
                <td className="text-green-500 font-semibold">Delivered</td>
              </tr>
              <tr>
                <td className="py-3 px-4">#12346</td>
                <td>Onions (5kg)</td>
                <td>₹200</td>
                <td className="text-yellow-500 font-semibold">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}