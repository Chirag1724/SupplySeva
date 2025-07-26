import React, { useState } from 'react';
import { Package, Search, Filter, Clock, CheckCircle, Truck, RotateCcw } from 'lucide-react';

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');

  // Sample orders data
  const orders = [
    {
      id: '#YZ3456',
      supplier: 'Fresh Farms',
      orderDate: '2024-07-20',
      deliveryEstimate: '2024-07-22',
      status: 'delivered',
      logo: 'fresh-farms',
      items: ['Organic Tomatoes', 'Fresh Lettuce', 'Green Peppers'],
      total: '$45.50'
    },
    {
      id: '#AB9012',
      supplier: 'Spice Merchants',
      orderDate: '2024-07-18',
      deliveryEstimate: '2024-07-17',
      status: 'shipped',
      logo: 'spice-merchants',
      items: ['Turmeric Powder', 'Cumin Seeds', 'Black Pepper'],
      total: '$28.75'
    },
    {
      id: '#CD5678',
      supplier: 'Dairy Delights',
      orderDate: '2024-07-10',
      deliveryEstimate: '2024-07-12',
      status: 'delivered',
      logo: 'dairy-delights',
      items: ['Organic Milk', 'Greek Yogurt', 'Aged Cheddar'],
      total: '$32.20'
    },
    {
      id: '#EF1234',
      supplier: 'Bakery Bliss',
      orderDate: '2024-07-05',
      deliveryEstimate: '2024-07-07',
      status: 'delivered',
      logo: 'bakery-bliss',
      items: ['Sourdough Bread', 'Croissants', 'Chocolate Muffins'],
      total: '$19.95'
    },
    {
      id: '#GH7890',
      supplier: 'Meat Masters',
      orderDate: '2024-06-30',
      deliveryEstimate: '2024-07-02',
      status: 'delivered',
      logo: 'meat-masters',
      items: ['Premium Beef', 'Chicken Breast', 'Lamb Chops'],
      total: '$89.40'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-blue-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getSupplierLogo = (logo) => {
    const logoColors = {
      'fresh-farms': 'bg-green-600',
      'spice-merchants': 'bg-yellow-600',
      'dairy-delights': 'bg-blue-400',
      'bakery-bliss': 'bg-orange-500',
      'meat-masters': 'bg-gray-600'
    };

    const logoNames = {
      'fresh-farms': 'Fresh Farms',
      'spice-merchants': 'Spice Merchants',
      'dairy-delights': 'Dairy Delights',
      'bakery-bliss': 'Bakery Bliss',
      'meat-masters': 'Meat Masters'
    };

    return (
      <div className={`w-16 h-10 rounded-lg ${logoColors[logo]} flex items-center justify-center text-white text-xs font-semibold`}>
        {logoNames[logo].split(' ').map(word => word[0]).join('')}
      </div>
    );
  };

  const handleRepeatOrder = (order) => {
    alert(`Repeating order ${order.id} from ${order.supplier}\nItems: ${order.items.join(', ')}\nTotal: ${order.total}`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || order.status === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Orders</h1>
        <p className="text-gray-600">Track your past and ongoing orders easily</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders or suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Date Range</option>
              <option value="last-week">Last Week</option>
              <option value="last-month">Last Month</option>
              <option value="last-3-months">Last 3 Months</option>
            </select>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {['All', 'Delivered', 'Shipped', 'Processing'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                {/* Left side - Order info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    {getSupplierLogo(order.logo)}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-medium text-blue-600">{order.id}</span>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)} flex items-center gap-1`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{order.supplier}</h3>
                      <div className="text-sm text-gray-600">
                        <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                        <p>Delivery Estimate: {new Date(order.deliveryEstimate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order items */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Items:</p>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">{order.total}</span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleRepeatOrder(order)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Repeat Order
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        <Package className="w-4 h-4" />
                        Track Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;