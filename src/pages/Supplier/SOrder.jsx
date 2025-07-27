import React, { useState, useEffect } from 'react';
import { Search, Eye, Filter, Calendar, Package, User, Home, ShoppingCart, Archive, Bell,ChevronDown,Download,RefreshCw,LogOut} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SupplierOrderPage = () => {
  const navigate = useNavigate();
  
    const handleNavigation = (path) => {
        navigate(path);
    };
  
  const [orders] = useState([
    {
      id: '#12345',
      vendor: 'Fresh Farms Co.',
      items: '5 kg Onions, 2 kg Spices',
      quantity: '7 kg',
      value: '$80',
      deliveryAddress: '123 Main St, Anytown',
      status: 'Pending'
    },
    {
      id: '#12346',
      vendor: 'Green Grocers',
      items: '10 kg Potatoes, 3 kg Tomatoes',
      quantity: '13 kg',
      value: '$75',
      deliveryAddress: '456 Oak Ave, Anytown',
      status: 'Accepted'
    },
    {
      id: '#12347',
      vendor: 'Organic Oasis',
      items: '2 kg Carrots, 1 kg Spinach',
      quantity: '3 kg',
      value: '$30',
      deliveryAddress: '789 Pine Ln, Anytown',
      status: 'Dispatched'
    },
    {
      id: '#12348',
      vendor: 'Local Harvest',
      items: '8 kg Apples, 4 kg Bananas',
      quantity: '12 kg',
      value: '$60',
      deliveryAddress: '101 Elm Rd, Anytown',
      status: 'Delivered'
    },
    {
      id: '#12349',
      vendor: 'Farm Fresh Foods',
      items: '5 kg Cabbage, 2 kg Broccoli',
      quantity: '7 kg',
      value: '$45',
      deliveryAddress: '222 Maple Dr, Anytown',
      status: 'Declined'
    }
  ]);

  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    let filtered = orders;
    
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'All') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Accepted': return 'bg-blue-100 text-blue-800';
      case 'Dispatched': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewOrder = (orderId) => {
    alert(`Viewing order ${orderId}`);
  };

  const handleRefresh = () => {
    alert('Orders refreshed!');
  };

  const handleExport = () => {
    alert('Exporting orders to CSV...');
  };


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <nav className="mt-6">
          <div className="px-6">
            <button 
              onClick={() => handleNavigation('/supplier/dashboard')}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </button>
            <button 
              onClick={() => handleNavigation('/supplier/orders')}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg mt-1 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 mr-3" />
              Orders
            </button>
            <button 
              onClick={() => handleNavigation('/supplier/inventory')}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer mt-1 transition-colors"
            >
              <Archive className="w-5 h-5 mr-3" />
              Inventory
            </button>
            <button 
              onClick={() => handleNavigation('/supplier/profile')}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer mt-1 transition-colors"
            >
              <User className="w-5 h-5 mr-3" />
              Profile
            </button>
            <button 
              onClick={() => handleNavigation('/')}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer mt-1 transition-colors"
            >
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
              <h1 className="text-2xl font-bold text-gray-900">Incoming Orders</h1>
              <p className="text-gray-600 mt-1">Manage new vendor requests and track fulfillment</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleRefresh}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-80"
                />
              </div>
              
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Declined">Declined</option>
                </select>
                <ChevronDown className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Order ID</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Vendor</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Items</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Quantity</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Value</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Delivery Address</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="py-4 px-6 text-sm text-gray-700">{order.vendor}</td>
                      <td className="py-4 px-6 text-sm text-gray-700 max-w-xs truncate">{order.items}</td>
                      <td className="py-4 px-6 text-sm text-gray-700">{order.quantity}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{order.value}</td>
                      <td className="py-4 px-6 text-sm text-gray-700 max-w-xs truncate">{order.deliveryAddress}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleViewOrder(order.id)}
                          className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Order
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'Pending').length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Accepted</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'Accepted').length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Dispatched</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'Dispatched').length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'Delivered').length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierOrderPage;