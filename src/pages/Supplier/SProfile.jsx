import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle,
  Edit3,
  Save,
  X,
  Camera,
  Calendar,
  TrendingUp,
  Award,
  Home,
  ShoppingCart,
  Archive,
  Bell,
  Upload,
  Download,
  Eye,
  Filter,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const SupplierProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [supplierData, setSupplierData] = useState({
    name: 'Fresh Farms Co.',
    email: 'contact@freshfarms.com',
    phone: '+1 (555) 123-4567',
    address: '123 Farm Road, Green Valley, CA 90210',
    rating: 4.8,
    joinDate: '2022-03-15',
    totalOrders: 156,
    completedOrders: 142,
    pendingOrders: 8,
    cancelledOrders: 6,
    totalRevenue: 45680,
    description: 'Premium organic farm supplying fresh vegetables and fruits directly from farm to table. Committed to sustainable farming practices and quality produce.',
    specialties: ['Organic Vegetables', 'Fresh Fruits', 'Herbs', 'Seasonal Produce'],
    certifications: ['USDA Organic', 'Fair Trade', 'ISO 22000'],
    paymentTerms: 'Net 30 days',
    deliveryRadius: '50 miles',
    minimumOrder: '$100'
  });

  const [recentOrders] = useState([
    { id: '#12345', date: '2024-07-25', items: '5kg Onions, 2kg Tomatoes', value: '$45', status: 'Delivered' },
    { id: '#12344', date: '2024-07-24', items: '10kg Potatoes, 3kg Carrots', value: '$65', status: 'Delivered' },
    { id: '#12343', date: '2024-07-23', items: '2kg Spinach, 1kg Lettuce', value: '$28', status: 'Pending' },
    { id: '#12342', date: '2024-07-22', items: '8kg Apples, 4kg Bananas', value: '$85', status: 'Delivered' },
    { id: '#12341', date: '2024-07-21', items: '3kg Broccoli, 2kg Cauliflower', value: '$38', status: 'Delivered' }
  ]);

  const [reviews] = useState([
    { id: 1, customer: 'Green Grocers', rating: 5, comment: 'Excellent quality produce, always fresh and on time!', date: '2024-07-20' },
    { id: 2, customer: 'City Market', rating: 5, comment: 'Best supplier we work with. Reliable and professional.', date: '2024-07-18' },
    { id: 3, customer: 'Organic Store', rating: 4, comment: 'Good quality, competitive prices. Recommended!', date: '2024-07-15' },
    { id: 4, customer: 'Local Restaurant', rating: 5, comment: 'Fresh ingredients delivered exactly as promised.', date: '2024-07-12' }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const navigate = useNavigate();
  
  const handleNavigation = (path) => {
        navigate(path);
    };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
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
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer mt-1 transition-colors">
              <Archive className="w-5 h-5 mr-3" />
              Inventory
            </button>
            <button 
              onClick={() => handleNavigation('/supplier/profile')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg mt-1">
              <User className="w-5 h-5 mr-3" />
              Profile
            </button>
            <button 
              onClick={() => handleNavigation('/')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer mt-1 transition-colors" >
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
              <h1 className="text-2xl font-bold text-gray-900">Supplier Profile</h1>
              <p className="text-gray-600 mt-1">Manage your business information and track performance</p>
            </div>
            <div className="flex items-center space-x-4">
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button 
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Profile Header Card */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">F</span>
                </div>
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={supplierData.name}
                        onChange={(e) => setSupplierData({...supplierData, name: e.target.value})}
                        className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 bg-transparent focus:outline-none"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-gray-900">{supplierData.name}</h2>
                    )}
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center">
                        {renderStars(supplierData.rating)}
                        <span className="ml-2 text-sm font-medium text-gray-700">{supplierData.rating}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        Joined {new Date(supplierData.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">${supplierData.totalRevenue.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Revenue</div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-900">{supplierData.totalOrders}</div>
                    <div className="text-sm text-gray-600">Total Orders</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{supplierData.completedOrders}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{((supplierData.completedOrders / supplierData.totalOrders) * 100).toFixed(1)}%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['overview', 'orders', 'reviews', 'documents'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Business Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={supplierData.email}
                        onChange={(e) => setSupplierData({...supplierData, email: e.target.value})}
                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    ) : (
                      <span className="text-gray-700">{supplierData.email}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={supplierData.phone}
                        onChange={(e) => setSupplierData({...supplierData, phone: e.target.value})}
                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    ) : (
                      <span className="text-gray-700">{supplierData.phone}</span>
                    )}
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    {isEditing ? (
                      <textarea
                        value={supplierData.address}
                        onChange={(e) => setSupplierData({...supplierData, address: e.target.value})}
                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        rows="2"
                      />
                    ) : (
                      <span className="text-gray-700">{supplierData.address}</span>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Description</h4>
                  {isEditing ? (
                    <textarea
                      value={supplierData.description}
                      onChange={(e) => setSupplierData({...supplierData, description: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows="3"
                    />
                  ) : (
                    <p className="text-gray-700 text-sm">{supplierData.description}</p>
                  )}
                </div>
              </div>

              {/* Specialties & Certifications */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specialties & Certifications</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {supplierData.specialties.map((specialty, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Certifications</h4>
                  <div className="space-y-2">
                    {supplierData.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center">
                        <Award className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-gray-700 text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Payment Terms:</span>
                    <span className="text-sm font-medium text-gray-900">{supplierData.paymentTerms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Delivery Radius:</span>
                    <span className="text-sm font-medium text-gray-900">{supplierData.deliveryRadius}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Minimum Order:</span>
                    <span className="text-sm font-medium text-gray-900">{supplierData.minimumOrder}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Order ID</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Date</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Items</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Value</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{order.date}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{order.items}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">{order.value}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{review.customer}</h4>
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <p className="text-gray-700 mt-2">{review.comment}</p>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
                  <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['Business License', 'Tax Certificate', 'Insurance Policy', 'Quality Certificates'].map((doc, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{doc}</h4>
                          <p className="text-sm text-gray-600 mt-1">PDF • 2.5 MB</p>
                        </div>
                        <button className="text-green-600 hover:text-green-700">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;