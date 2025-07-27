import React, { useState } from "react";
import { Edit, Save, Shield, Bell, HelpCircle, ChevronRight, Star } from 'lucide-react';

export default function VendorProfile() {
  const [editing, setEditing] = useState(false);
  const [vendor, setVendor] = useState({
    name: "Raju Chaat Bhandar",
    email: "rajuvendor@gmail.com",
    phone: "+91 9876543210",
    city: "Lucknow",
    pincode: "226001",
    address: "123, Hazratganj, Lucknow",
    vendorType: "Street Food",
    rating: 4.7,
    totalOrders: 128,
    joinedOn: "Jan 2024",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=600",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [activeTab, setActiveTab] = useState("profile");

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditing(false);
    // Here you would typically make an API call to save the changes
  };

  const handlePasswordSave = () => {
    // Add password validation and API call here
    setPassword({ current: "", new: "", confirm: "" });
    setActiveTab("profile");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVendor({...vendor, image: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* LEFT COLUMN */}
      <div className="col-span-1 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center relative">
          <div className="relative inline-block">
            <img
              src={vendor.image}
              alt={vendor.name}
              className="w-32 h-32 rounded-full border-4 border-green-400 mx-auto mb-4 object-cover"
            />
            <label className="absolute bottom-4 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition">
              <input 
                type="file" 
                className="hidden" 
                onChange={handleImageChange} 
                accept="image/*" 
              />
              <Edit className="w-4 h-4 text-gray-700" />
            </label>
          </div>
          <h1 className="text-xl font-bold text-gray-800">{vendor.name}</h1>
          <p className="text-gray-500">{vendor.vendorType}</p>
          
          <div className="flex justify-center items-center mt-4 gap-2">
            <div className="flex items-center bg-green-100 text-green-600 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
              <span>{vendor.rating}</span>
            </div>
            <span className="text-gray-500 text-sm">Since {vendor.joinedOn}</span>
          </div>
          
          <div className="mt-4 bg-blue-50 text-blue-600 rounded-lg p-2">
            <p className="font-medium">Total Orders</p>
            <p className="text-2xl font-bold">{vendor.totalOrders}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 px-2">Account Settings</h2>
          <div className="space-y-1">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 transition ${activeTab === "profile" ? "bg-green-50 text-green-600" : ""}`}
            >
              <div className="flex items-center">
                <Edit className="w-5 h-5 mr-3" />
                <span>Profile Information</span>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => setActiveTab("password")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 transition ${activeTab === "password" ? "bg-green-50 text-green-600" : ""}`}
            >
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-3" />
                <span>Change Password</span>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>
            
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-3">
        {activeTab === "profile" ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
              {editing ? (
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow-sm"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition shadow-sm"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Business Name", field: "name", type: "text" },
                  { label: "Email Address", field: "email", type: "email" },
                  { label: "Phone Number", field: "phone", type: "tel" },
                  { label: "City", field: "city", type: "text" },
                  { label: "Pincode", field: "pincode", type: "text" },
                  { label: "Full Address", field: "address", type: "text", fullWidth: true },
                ].map((item) => (
                  <div key={item.field} className={item.fullWidth ? "md:col-span-2" : ""}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {item.label}
                    </label>
                    <input
                      name={item.field}
                      type={item.type}
                      value={vendor[item.field]}
                      onChange={handleChange}
                      readOnly={!editing}
                      className={`w-full border ${editing ? "border-gray-300 bg-white focus:border-green-400" : "border-transparent bg-gray-50"} rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-100 focus:outline-none transition shadow-sm`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Change Password</h2>
            </div>
            
            <div className="p-6">
              <div className="max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    name="current"
                    type="password"
                    value={password.current}
                    onChange={handlePasswordChange}
                    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-100 focus:border-green-400 focus:outline-none transition shadow-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    name="new"
                    type="password"
                    value={password.new}
                    onChange={handlePasswordChange}
                    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-100 focus:border-green-400 focus:outline-none transition shadow-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    name="confirm"
                    type="password"
                    value={password.confirm}
                    onChange={handlePasswordChange}
                    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-100 focus:border-green-400 focus:outline-none transition shadow-sm"
                  />
                </div>
                
                <button
                  onClick={handlePasswordSave}
                  className="mt-4 flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow-sm"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 