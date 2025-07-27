import React, { useState } from 'react';
import { TrendingUp, Package, AlertTriangle, CheckCircle,Bell,Home,ShoppingCart,Archive,User,BarChart3,Calendar,ArrowUp,ArrowDown,Eye,RefreshCw,LogOut} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SupplierDashboard = () => {
  const [salesData] = useState([
    { week: 'Week 1', sales: 45000 },
    { week: 'Week 2', sales: 52000 },
    { week: 'Week 3', sales: 48000 },
    { week: 'Week 4', sales: 58000 }
  ]);

  const [inventoryData] = useState([
    { name: 'Organic Turmeric Powder', stock: 25, unit: 'kg', status: 'Good', restockDate: '2024-08-15' },
    { name: 'Premium Saffron Threads', stock: 2, unit: 'kg', status: 'Low', restockDate: '2024-08-01' },
    { name: 'Natural Honey', stock: 50, unit: 'kg', status: 'Good', restockDate: '2024-08-20' },
    { name: 'Handmade Soaps', stock: 0, unit: 'pieces', status: 'Out', restockDate: '2024-07-28' },
    { name: 'Aromatic Jasmine Sticks', stock: 150, unit: 'pieces', status: 'Good', restockDate: '2024-08-10' }
  ]);

  const [topProducts] = useState([
    { 
      id: 1, 
      name: 'Organic Turmeric Powder', 
      sales: '₹45,200', 
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=150&h=150&fit=crop&crop=center'
    },
    { 
      id: 2, 
      name: 'Premium Saffron Threads', 
      sales: '₹38,500', 
      image: 'https://images.unsplash.com/photo-1609501676725-7186f0ec009b?w=150&h=150&fit=crop&crop=center'
    },
    { 
      id: 3, 
      name: 'Natural Honey', 
      sales: '₹29,800', 
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=150&h=150&fit=crop&crop=center'
    }
  ]);

  const [alerts] = useState([
    { id: 1, type: 'stock', message: 'Low Stock Alert - Premium Saffron Threads running low', time: '2 hours ago' },
    { id: 2, type: 'performance', message: 'Top Product Performance - Turmeric Powder increased by 15%', time: '1 day ago' }
  ]);

  const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };


  const getStockStatus = (status) => {
    switch (status) {
      case 'Good': return 'text-green-600 bg-green-100';
      case 'Low': return 'text-yellow-600 bg-yellow-100';
      case 'Out': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const maxSales = Math.max(...salesData.map(d => d.sales));

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        
        <nav className="mt-6">
          <div className="px-6">
            <button 
              onClick={() => handleNavigation('/supplier/dashboard')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg">
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
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer mt-1 transition-colors">
              <User className="w-5 h-5 mr-3" />
              Profile
            </button>
            <button 
              onClick={() => handleNavigation('/')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer mt-1 transition-colors"
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
              <h1 className="text-2xl font-bold text-gray-900">Supplier Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business today.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Sales Snapshot */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sales Snapshot</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Sales This Month</p>
                    <p className="text-2xl font-bold text-gray-900">₹1,250,000</p>
                    <div className="flex items-center mt-2">
                      <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+15%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Products Listed</p>
                    <p className="text-2xl font-bold text-gray-900">250</p>
                    <div className="flex items-center mt-2">
                      <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+8%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Most Sold Product</p>
                    <p className="text-lg font-bold text-gray-900">Organic Turmeric Powder</p>
                    <p className="text-sm text-gray-600 mt-1">125 units sold</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                    <div className="flex items-center mt-2">
                      <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                      <span className="text-sm text-red-600 font-medium">-2 from yesterday</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Data Chart */}
          <div className="mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales Performance</h3>
              <div className="space-y-4">
                {salesData.map((data, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-16 text-sm text-gray-600">{data.week}</div>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-8 relative">
                        <div 
                          className="bg-green-500 h-8 rounded-full flex items-center justify-end pr-3"
                          style={{ width: `${(data.sales / maxSales) * 100}%` }}
                        >
                          <span className="text-white text-sm font-medium">₹{data.sales.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Inventory Health */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Health</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Product Name</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Stock Left</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Restock Needed</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {inventoryData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-3 text-sm text-gray-900">{item.name}</td>
                        <td className="py-3 text-sm text-gray-700">{item.stock} {item.unit}</td>
                        <td className="py-3 text-sm text-gray-700">{item.restockDate}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStockStatus(item.status)}`}>
                            {item.status === 'Out' ? 'Restock Now' : item.status === 'Low' ? 'Restock Soon' : 'Good'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Performing Products */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMSAyNEgyN1YzMEgyMVYyNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+dGggZD0iTTI3IDI0SDMzVjMwSDI3VjI0WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMzMgMjRIMzlWMzBIMzNWMjRaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMSAzMEgyN1YzNkgyMVYzMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+dGggZD0iTTI3IDMwSDMzVjM2SDI3VjMwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMzMgMzBIMzlWMzZIMzNWMzBaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-600">Sales: {product.sales}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-green-600">#{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts & Notifications</h3>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${alert.type === 'stock' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.type === 'stock' ? 'Low Stock Alert' : 'Top Product Performance'}</p>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  </div>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;