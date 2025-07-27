import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ShoppingCart, Archive, User, LogOut, Upload, Camera, X, Check } from 'lucide-react';
import axios from 'axios';

export default function RegisterProducts() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Vegetables',
    image: null,
    imagePreview: null,
  });

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('description', formData.description);
      form.append('price', formData.price);
      form.append('stock', formData.stock);
      form.append('category', formData.category);
      if (formData.image) {
        form.append('image', formData.image);
      }

      const user = JSON.parse(localStorage.getItem("user"));
      console.log("🟡 USER FROM STORAGE:", user);

      if (!user || !user._id) {
        alert("User not logged in");
        return;
      }

      form.append("creatorId", user._id);
      form.append("creatorRole", user.role);

      const res = await axios.post('http://localhost:5000/api/products/add', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('✅ Product added:', res.data);
      alert('Product added successfully!');
      navigate('/supplier/inventory');
    } catch (err) {
      console.error('❌ Error adding product:', err);
      alert('Failed to add product');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <nav className="mt-6">
          <div className="px-6">
            <button 
              onClick={() => handleNavigation('/supplier/dashboard')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer mt-1 transition-colors">
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </button>
            <button 
              onClick={() => handleNavigation('/supplier/orders')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer mt-1 transition-colors">
              <ShoppingCart className="w-5 h-5 mr-3" />
              Orders
            </button>
            <button 
              onClick={() => handleNavigation('/supplier/inventory')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg">
              <Archive className="w-5 h-5 mr-3" />
              Inventory
            </button>
            <button 
              onClick={() => handleNavigation('/supplier/profile')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer mt-1 transition-colors">
              <User className="w-5 h-5 mr-3" />
              Profile
            </button>
            <button 
              onClick={() => handleNavigation('/')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer mt-1 transition-colors">
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
              <p className="text-gray-600 mt-1">Create a new product listing for your inventory</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleNavigation('/supplier/inventory')}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Back to Inventory
              </button>
            </div>
          </div>
        </header>

        {/* Form Content */}
        <div className="px-6 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter product name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Grains">Grains</option>
                        <option value="Spices">Spices</option>
                        <option value="Sweeteners">Sweeteners</option>
                        <option value="Personal Care">Personal Care</option>
                        <option value="Fragrance">Fragrance</option>
                      </select>
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₹/kg) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        step="0.01"
                        min="0"
                        required
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Stock */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Stock (kg) *
                      </label>
                      <input
                        type="number"
                        name="stock"
                        min="0"
                        required
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={formData.stock}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        rows="4"
                        placeholder="Enter product description, quality details, origin information..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Image
                      </label>
                      
                      {formData.imagePreview ? (
                        <div className="relative">
                          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                            <div className="flex items-center space-x-4">
                              <img
                                src={formData.imagePreview}
                                alt="Product preview"
                                className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Check className="w-5 h-5 text-green-500" />
                                  <p className="text-sm font-medium text-green-600">Image uploaded successfully</p>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                  Your product image looks great! You can change it if needed.
                                </p>
                                <div className="flex space-x-2">
                                  <label
                                    htmlFor="image-upload"
                                    className="inline-flex items-center px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                                  >
                                    <Camera className="w-4 h-4 mr-1" />
                                    Change Image
                                  </label>
                                  <button
                                    type="button"
                                    onClick={removeImage}
                                    className="inline-flex items-center px-3 py-1 text-sm text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                                  >
                                    <X className="w-4 h-4 mr-1" />
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                          />
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                          />
                          
                          <div className="space-y-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                              <Upload className="w-8 h-8 text-gray-400" />
                            </div>
                            <div>
                              <label
                                htmlFor="image-upload"
                                className="cursor-pointer inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                              >
                                <Camera className="w-4 h-4 mr-2" />
                                Upload Product Image
                              </label>
                              <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                            </div>
                            <p className="text-xs text-gray-400">
                              High-quality images help customers understand your product better
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => navigate('/products')}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Tips Card */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Tips for Better Product Listings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Camera className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">High-Quality Images</p>
                    <p className="text-sm text-gray-600">Use clear, well-lit photos to showcase your products. Natural lighting works best.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Archive className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Detailed Descriptions</p>
                    <p className="text-sm text-gray-600">Include origin, freshness, quality details, and any certifications.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <ShoppingCart className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Competitive Pricing</p>
                    <p className="text-sm text-gray-600">Research market rates for fair pricing that attracts customers.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm font-medium text-green-800">Pro Tip:</p>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Products with complete information and good images get 3x more orders than incomplete listings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}