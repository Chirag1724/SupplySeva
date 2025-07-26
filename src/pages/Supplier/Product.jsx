import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Package, AlertCircle, Check, X, Filter, ChevronDown, TrendingUp, Eye, MoreVertical, Upload, Star, ShoppingCart } from 'lucide-react';

const SupplierProductManager = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Fresh Tomato',
      price: 15,
      currentStock: 120,
      lastUpdated: '2023-09-20',
      totalOrders: 500,
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1546470427-e75e65aaf2d4?w=400&h=400&fit=crop&crop=center',
      status: 'In Stock',
      rating: 4.8,
      description: 'Premium quality fresh tomatoes, rich in vitamins and antioxidants'
    },
    {
      id: 2,
      name: 'Organic Potato',
      price: 10,
      currentStock: 200,
      lastUpdated: '2023-09-19',
      totalOrders: 400,
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop&crop=center',
      status: 'In Stock',
      rating: 4.6,
      description: 'Organic potatoes grown without pesticides, perfect for cooking'
    },
    {
      id: 3,
      name: 'Red Onion',
      price: 12,
      currentStock: 150,
      lastUpdated: '2023-09-18',
      totalOrders: 350,
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=400&fit=crop&crop=center',
      status: 'In Stock',
      rating: 4.7,
      description: 'Fresh red onions with sharp flavor, ideal for salads and cooking'
    },
    {
      id: 4,
      name: 'Baby Carrots',
      price: 18,
      currentStock: 80,
      lastUpdated: '2023-09-17',
      totalOrders: 200,
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=400&fit=crop&crop=center',
      status: 'Low Stock',
      rating: 4.9,
      description: 'Sweet and tender baby carrots, perfect for snacking and cooking'
    },
    {
      id: 5,
      name: 'Green Cabbage',
      price: 20,
      currentStock: 50,
      lastUpdated: '2023-09-16',
      totalOrders: 150,
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&h=400&fit=crop&crop=center',
      status: 'Low Stock',
      rating: 4.5,
      description: 'Fresh green cabbage, rich in nutrients and perfect for salads'
    },
    {
      id: 6,
      name: 'Fresh Apples',
      price: 25,
      currentStock: 180,
      lastUpdated: '2023-09-15',
      totalOrders: 300,
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=400&fit=crop&crop=center',
      status: 'In Stock',
      rating: 4.7,
      description: 'Crispy and sweet fresh apples, perfect for healthy snacking'
    },
    {
      id: 7,
      name: 'Banana Bunch',
      price: 8,
      currentStock: 90,
      lastUpdated: '2023-09-14',
      totalOrders: 250,
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=400&fit=crop&crop=center',
      status: 'In Stock',
      rating: 4.4,
      description: 'Fresh banana bunches, rich in potassium and energy'
    },
    {
      id: 8,
      name: 'Whole Wheat Bread',
      price: 30,
      currentStock: 45,
      lastUpdated: '2023-09-13',
      totalOrders: 120,
      category: 'Grains',
      image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&h=400&fit=crop&crop=center',
      status: 'Low Stock',
      rating: 4.6,
      description: 'Freshly baked whole wheat bread, healthy and nutritious'
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDropdown, setShowDropdown] = useState({ category: false, status: false, price: false });
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    currentStock: '',
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1546470427-e75e65aaf2d4?w=400&h=400&fit=crop&crop=center',
    description: ''
  });

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Meat', 'Organic'];
  const statusOptions = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];
  const priceRanges = ['All', '0-10', '10-20', '20-30', '30+'];
  
  const productImages = [
    'https://images.unsplash.com/photo-1546470427-e75e65aaf2d4?w=400&h=400&fit=crop&crop=center', // Tomato
    'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop&crop=center', // Potato
    'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=400&fit=crop&crop=center', // Onion
    'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=400&fit=crop&crop=center', // Carrot
    'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&h=400&fit=crop&crop=center', // Cabbage
    'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=400&fit=crop&crop=center', // Apple
    'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=400&fit=crop&crop=center', // Banana
    'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&h=400&fit=crop&crop=center', // Bread
    'https://images.unsplash.com/photo-1563379091339-03246963d204?w=400&h=400&fit=crop&crop=center', // Milk
    'https://images.unsplash.com/photo-1448907503123-67254d59ca4f?w=400&h=400&fit=crop&crop=center', // Meat
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center', // Lettuce
    'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&h=400&fit=crop&crop=center'  // Broccoli
  ];

  // Filter products based on search and filters
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
      
      let matchesPrice = true;
      if (priceRange !== 'All') {
        const price = product.price;
        switch (priceRange) {
          case '0-10':
            matchesPrice = price >= 0 && price <= 10;
            break;
          case '10-20':
            matchesPrice = price > 10 && price <= 20;
            break;
          case '20-30':
            matchesPrice = price > 20 && price <= 30;
            break;
          case '30+':
            matchesPrice = price > 30;
            break;
          default:
            matchesPrice = true;
        }
      }
      
      return matchesSearch && matchesCategory && matchesStatus && matchesPrice;
    });
    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedStatus, priceRange]);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.currentStock) {
      const product = {
        id: Date.now(),
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        currentStock: parseInt(newProduct.currentStock),
        lastUpdated: new Date().toISOString().split('T')[0],
        totalOrders: 0,
        category: newProduct.category,
        image: newProduct.image,
        description: newProduct.description,
        rating: 4.5,
        status: parseInt(newProduct.currentStock) > 100 ? 'In Stock' : 
                parseInt(newProduct.currentStock) > 50 ? 'Low Stock' : 'Out of Stock'
      };
      
      setProducts([...products, product]);
      setNewProduct({ 
        name: '', 
        price: '', 
        currentStock: '', 
        category: 'Vegetables', 
        image: 'https://images.unsplash.com/photo-1546470427-e75e65aaf2d4?w=400&h=400&fit=crop&crop=center',
        description: ''
      });
      setShowAddModal(false);
    }
  };

  const handleEditProduct = () => {
    if (editingProduct) {
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? {
              ...editingProduct,
              lastUpdated: new Date().toISOString().split('T')[0],
              status: editingProduct.currentStock > 100 ? 'In Stock' : 
                      editingProduct.currentStock > 50 ? 'Low Stock' : 'Out of Stock'
            }
          : p
      );
      setProducts(updatedProducts);
      setShowEditModal(false);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleMarkOutOfStock = (id) => {
    const updatedProducts = products.map(p => 
      p.id === id 
        ? { ...p, status: 'Out of Stock', currentStock: 0, lastUpdated: new Date().toISOString().split('T')[0] }
        : p
    );
    setProducts(updatedProducts);
  };

  const handleRestock = (id) => {
    const stock = prompt('Enter new stock quantity:');
    if (stock && !isNaN(stock)) {
      const quantity = parseInt(stock);
      const updatedProducts = products.map(p => 
        p.id === id 
          ? { 
              ...p, 
              currentStock: quantity,
              status: quantity > 100 ? 'In Stock' : quantity > 50 ? 'Low Stock' : 'Out of Stock',
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : p
      );
      setProducts(updatedProducts);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Low Stock': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Out of Stock': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const toggleDropdown = (type) => {
    setShowDropdown(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const stats = {
    totalProducts: products.length,
    inStock: products.filter(p => p.status === 'In Stock').length,
    lowStock: products.filter(p => p.status === 'Low Stock').length,
    totalOrders: products.reduce((sum, p) => sum + p.totalOrders, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Product Dashboard
              </h1>
              <p className="text-slate-600 mt-2">Manage your inventory with ease and efficiency</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add New Product
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Products</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.totalProducts}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">In Stock</p>
                  <p className="text-3xl font-bold text-emerald-600">{stats.inStock}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Check className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Low Stock</p>
                  <p className="text-3xl font-bold text-amber-600">{stats.lowStock}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Orders</p>
                  <p className="text-3xl font-bold text-indigo-600">{stats.totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 shadow-lg">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products by name..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-slate-900 placeholder-slate-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('category')}
                  className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 shadow-sm"
                >
                  <Filter className="w-4 h-4 text-slate-600" />
                  <span className="text-slate-700 font-medium">Category</span>
                  <span className="text-blue-600 font-semibold">{selectedCategory}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                {showDropdown.category && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-20 min-w-48">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowDropdown(prev => ({ ...prev, category: false }));
                        }}
                        className="block w-full text-left px-4 py-3 hover:bg-slate-50 first:rounded-t-xl last:rounded-b-xl transition-colors duration-200"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Status Filter */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('status')}
                  className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 shadow-sm"
                >
                  <span className="text-slate-700 font-medium">Status</span>
                  <span className="text-blue-600 font-semibold">{selectedStatus}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                {showDropdown.status && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-20 min-w-48">
                    {statusOptions.map(status => (
                      <button
                        key={status}
                        onClick={() => {
                          setSelectedStatus(status);
                          setShowDropdown(prev => ({ ...prev, status: false }));
                        }}
                        className="block w-full text-left px-4 py-3 hover:bg-slate-50 first:rounded-t-xl last:rounded-b-xl transition-colors duration-200"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range Filter */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('price')}
                  className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 shadow-sm"
                >
                  <span className="text-slate-700 font-medium">Price Range</span>
                  <span className="text-blue-600 font-semibold">{priceRange}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                {showDropdown.price && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-20 min-w-48">
                    {priceRanges.map(range => (
                      <button
                        key={range}
                        onClick={() => {
                          setPriceRange(range);
                          setShowDropdown(prev => ({ ...prev, price: false }));
                        }}
                        className="block w-full text-left px-4 py-3 hover:bg-slate-50 first:rounded-t-xl last:rounded-b-xl transition-colors duration-200"
                      >
                        {range === 'All' ? 'All Prices' : `₹${range}/kg`}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-slate-200">
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'table' 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {viewMode === 'table' ? (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/80 border-b border-slate-200">
                  <tr>
                    <th className="text-left py-6 px-6 font-semibold text-slate-900">Product</th>
                    <th className="text-left py-6 px-6 font-semibold text-slate-900">Price</th>
                    <th className="text-left py-6 px-6 font-semibold text-slate-900">Stock</th>
                    <th className="text-left py-6 px-6 font-semibold text-slate-900">Orders</th>
                    <th className="text-left py-6 px-6 font-semibold text-slate-900">Rating</th>
                    <th className="text-left py-6 px-6 font-semibold text-slate-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors duration-200">
                      <td className="py-6 px-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 rounded-xl object-cover shadow-sm border border-slate-200"
                            />
                            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                              product.status === 'In Stock' ? 'bg-emerald-500' :
                              product.status === 'Low Stock' ? 'bg-amber-500' : 'bg-red-500'
                            }`}></div>
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 text-lg">{product.name}</div>
                            <div className="text-slate-600 text-sm">{product.category}</div>
                            <div className="text-slate-500 text-xs mt-1 max-w-xs truncate">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="font-bold text-slate-900 text-xl">₹{product.price}</div>
                        <div className="text-slate-500 text-sm">per kg</div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-semibold text-slate-900">{product.currentStock} kg</div>
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                              {product.status}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4 text-slate-600" />
                          <span className="font-semibold text-slate-900">{product.totalOrders}</span>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-semibold text-slate-900">{product.rating}</span>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setShowEditModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {product.status !== 'Out of Stock' ? (
                            <button
                              onClick={() => handleMarkOutOfStock(product.id)}
                              className="px-3 py-2 text-amber-600 hover:bg-amber-50 rounded-lg text-xs font-medium transition-colors duration-200"
                            >
                              Mark Out
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRestock(product.id)}
                              className="px-3 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg text-xs font-medium transition-colors duration-200"
                            >
                              Restock
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Package className="w-20 h-20 text-slate-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 rounded-xl object-cover"
                  />
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                    {product.status}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{product.name}</h3>
                  <p className="text-slate-600 text-sm mb-2">{product.category}</p>
                  <p className="text-slate-500 text-xs line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="font-bold text-slate-900 text-xl">₹{product.price}/kg</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-slate-900">{product.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-slate-600">
                    Stock: <span className="font-semibold text-slate-900">{product.currentStock} kg</span>
                  </div>
                  <div className="text-sm text-slate-600">
                    Orders: <span className="font-semibold text-slate-900">{product.totalOrders}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setShowEditModal(true);
                    }}
                    className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex-1 bg-red-100 text-red-700 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-16">
                <Package className="w-20 h-20 text-slate-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}

        {/* Add New Product Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Add New Product</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      placeholder="Enter product name"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Price (₹/kg)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Current Stock (kg)</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      value={newProduct.currentStock}
                      onChange={(e) => setNewProduct({...newProduct, currentStock: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                    <select
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    >
                      {categories.filter(c => c !== 'All').map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                    <textarea
                      placeholder="Enter product description"
                      rows="3"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Product Image</label>
                    <div className="mb-3">
                      <img
                        src={newProduct.image}
                        alt="Preview"
                        className="w-full h-32 rounded-xl object-cover border border-slate-300"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                      {productImages.map((image, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setNewProduct({...newProduct, image})}
                          className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            newProduct.image === image ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-300 hover:border-slate-400'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Option ${index + 1}`}
                            className="w-full h-12 object-cover"
                          />
                          {newProduct.image === image && (
                            <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                              <Check className="w-3 h-3 text-blue-600" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleAddProduct}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Product
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-xl hover:bg-slate-300 transition-all duration-300 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {showEditModal && editingProduct && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Edit Product</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Price (₹/kg)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value) || 0})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Current Stock (kg)</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      value={editingProduct.currentStock}
                      onChange={(e) => setEditingProduct({...editingProduct, currentStock: parseInt(e.target.value) || 0})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                    <select
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    >
                      {categories.filter(c => c !== 'All').map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                    <textarea
                      rows="3"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Product Image</label>
                    <div className="mb-3">
                      <img
                        src={editingProduct.image}
                        alt="Preview"
                        className="w-full h-32 rounded-xl object-cover border border-slate-300"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                      {productImages.map((image, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setEditingProduct({...editingProduct, image})}
                          className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            editingProduct.image === image ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-300 hover:border-slate-400'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Option ${index + 1}`}
                            className="w-full h-12 object-cover"
                          />
                          {editingProduct.image === image && (
                            <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                              <Check className="w-3 h-3 text-blue-600" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleEditProduct}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Update Product
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-xl hover:bg-slate-300 transition-all duration-300 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierProductManager;