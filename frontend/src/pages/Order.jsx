import React, { useState } from 'react';
import { Package, Search, Filter, Clock, CheckCircle, Truck, RotateCcw, ArrowRight, Calendar, MapPin } from 'lucide-react';

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');

  // Sample orders data with Indian currency
  const orders = [
    {
      id: '#YZ3456',
      supplier: 'Fresh Farms',
      orderDate: '2024-07-20',
      deliveryEstimate: '2024-07-22',
      status: 'delivered',
      logo: 'fresh-farms',
      items: ['Organic Tomatoes', 'Fresh Lettuce', 'Green Peppers'],
      total: '₹3,640',
      itemCount: 3,
      address: 'Agra, Uttar Pradesh'
    },
    {
      id: '#AB9012',
      supplier: 'Spice Merchants',
      orderDate: '2024-07-18',
      deliveryEstimate: '2024-07-25',
      status: 'shipped',
      logo: 'spice-merchants',
      items: ['Turmeric Powder', 'Cumin Seeds', 'Black Pepper'],
      total: '₹2,300',
      itemCount: 3,
      address: 'Agra, Uttar Pradesh'
    },
    {
      id: '#CD5678',
      supplier: 'Dairy Delights',
      orderDate: '2024-07-10',
      deliveryEstimate: '2024-07-12',
      status: 'delivered',
      logo: 'dairy-delights',
      items: ['Organic Milk', 'Greek Yogurt', 'Aged Cheddar'],
      total: '₹2,576',
      itemCount: 3,
      address: 'Agra, Uttar Pradesh'
    },
    {
      id: '#EF1234',
      supplier: 'Bakery Bliss',
      orderDate: '2024-07-05',
      deliveryEstimate: '2024-07-07',
      status: 'delivered',
      logo: 'bakery-bliss',
      items: ['Sourdough Bread', 'Croissants', 'Chocolate Muffins'],
      total: '₹1,596',
      itemCount: 3,
      address: 'Agra, Uttar Pradesh'
    },
    {
      id: '#GH7890',
      supplier: 'Meat Masters',
      orderDate: '2024-06-30',
      deliveryEstimate: '2024-07-02',
      status: 'delivered',
      logo: 'meat-masters',
      items: ['Premium Beef', 'Chicken Breast', 'Lamb Chops'],
      total: '₹7,152',
      itemCount: 3,
      address: 'Agra, Uttar Pradesh'
    },
    {
      id: '#IJ4567',
      supplier: 'Green Valley',
      orderDate: '2024-07-25',
      deliveryEstimate: '2024-07-28',
      status: 'processing',
      logo: 'green-valley',
      items: ['Fresh Spinach', 'Broccoli', 'Carrots', 'Potatoes'],
      total: '₹1,890',
      itemCount: 4,
      address: 'Agra, Uttar Pradesh'
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
        return 'text-green-700 bg-green-100 border-green-200';
      case 'shipped':
        return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'processing':
        return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getSupplierLogo = (logo) => {
    const logoColors = {
      'fresh-farms': 'bg-gradient-to-br from-green-500 to-green-600',
      'spice-merchants': 'bg-gradient-to-br from-yellow-500 to-orange-500',
      'dairy-delights': 'bg-gradient-to-br from-blue-400 to-blue-500',
      'bakery-bliss': 'bg-gradient-to-br from-orange-400 to-red-500',
      'meat-masters': 'bg-gradient-to-br from-gray-600 to-gray-700',
      'green-valley': 'bg-gradient-to-br from-emerald-500 to-green-600'
    };

    const logoNames = {
      'fresh-farms': 'Fresh Farms',
      'spice-merchants': 'Spice Merchants',
      'dairy-delights': 'Dairy Delights',
      'bakery-bliss': 'Bakery Bliss',
      'meat-masters': 'Meat Masters',
      'green-valley': 'Green Valley'
    };

    return (
      <div className={`w-14 h-14 rounded-xl ${logoColors[logo]} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
        {logoNames[logo].split(' ').map(word => word[0]).join('')}
      </div>
    );
  };

  const handleRepeatOrder = (order) => {
    alert(`🔄 Repeating order ${order.id} from ${order.supplier}\n\n📦 Items: ${order.items.join(', ')}\n💰 Total: ${order.total}\n\nRedirecting to cart...`);
  };

  const handleTrackOrder = (orderId) => {
    window.location.href = '/track';
  };

  const filteredOrders = orders.filter(order => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Status tab filter
    const matchesTab = activeTab === 'All' || order.status === activeTab.toLowerCase();
    
    // Date range filter
    let matchesDateRange = true;
    if (selectedDateRange) {
      const orderDate = new Date(order.orderDate);
      const today = new Date();
      
      switch (selectedDateRange) {
        case 'last-week':{
          const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDateRange = orderDate >= lastWeek;
          break;
        }
        case 'last-month':{
          const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDateRange = orderDate >= lastMonth;
          break;
        }
        case 'last-3-months':{
          const last3Months = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
          matchesDateRange = orderDate >= last3Months;
          break;
        }
        default:
          matchesDateRange = true;
      }
    }
    
    return matchesSearch && matchesTab && matchesDateRange;
  });

  const getTabCount = (status) => {
    if (status === 'All') {
      return orders.filter(order => {
        // Apply search filter
        const matchesSearch = searchTerm === '' || 
          order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
        
        // Apply date range filter
        let matchesDateRange = true;
        if (selectedDateRange) {
          const orderDate = new Date(order.orderDate);
          const today = new Date();
          
          switch (selectedDateRange) {
            case 'last-week':{
              const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
              matchesDateRange = orderDate >= lastWeek;
              break;
            }
            case 'last-month':{
              const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
              matchesDateRange = orderDate >= lastMonth;
              break;
            }
            case 'last-3-months':{
              const last3Months = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
              matchesDateRange = orderDate >= last3Months;
              break;
            }
            default:
              matchesDateRange = true;
          }
        }
        
        return matchesSearch && matchesDateRange;
      }).length;
    }
    
    return orders.filter(order => {
      // Apply search filter
      const matchesSearch = searchTerm === '' || 
        order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Apply date range filter
      let matchesDateRange = true;
      if (selectedDateRange) {
        const orderDate = new Date(order.orderDate);
        const today = new Date();
        
        switch (selectedDateRange) {
          case 'last-week':{
            const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDateRange = orderDate >= lastWeek;
            break;
          }
          case 'last-month':{
            const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesDateRange = orderDate >= lastMonth;
            break;
          }
          case 'last-3-months':{
            const last3Months = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
            matchesDateRange = orderDate >= last3Months;
            break;
          }
          default:
            matchesDateRange = true;
        }
      }
      
      return order.status === status.toLowerCase() && matchesSearch && matchesDateRange;
    }).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
              <p className="text-gray-600 mt-1">Track and manage your past and ongoing orders</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredOrders.length}</p>
                </div>
                <Package className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-green-600">{filteredOrders.filter(o => o.status === 'delivered').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Shipped</p>
                  <p className="text-2xl font-bold text-blue-600">{filteredOrders.filter(o => o.status === 'shipped').length}</p>
                </div>
                <Truck className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Processing</p>
                  <p className="text-2xl font-bold text-yellow-600">{filteredOrders.filter(o => o.status === 'processing').length}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders, suppliers, or items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Date Range */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">All Time</option>
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-3-months">Last 3 Months</option>
              </select>
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              {['All', 'Delivered', 'Shipped', 'Processing'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-white text-green-600 shadow-sm border border-green-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab} ({getTabCount(tab)})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  {/* Left side - Order info */}
                  <div className="flex items-start gap-4 flex-1">
                    {getSupplierLogo(order.logo)}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{order.id}</span>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${getStatusColor(order.status)} flex items-center gap-1.5`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{order.supplier}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Ordered: {new Date(order.orderDate).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4" />
                          <span>Delivery: {new Date(order.deliveryEstimate).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{order.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          <span>{order.itemCount} items</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Total */}
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-gray-900">{order.total}</p>
                  </div>
                </div>

                {/* Order items */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Items Ordered:</p>
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item, index) => (
                      <span key={index} className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleRepeatOrder(order)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Repeat Order
                  </button>
                  <button 
                    onClick={() => handleTrackOrder(order.id)}
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm font-medium"
                  >
                    <Package className="w-4 h-4" />
                    Track Order
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria to find your orders</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setActiveTab('All');
                setSelectedDateRange('');
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">© 2024 Supply Seva | All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;