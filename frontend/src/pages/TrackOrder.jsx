import React, { useState } from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail, Calendar, User, CreditCard } from 'lucide-react';

const OrderTrackingPage = () => {
  const [selectedOrder] = useState({
    id: '#YZ3456',
    supplier: 'Fresh Farms',
    orderDate: '2024-07-20',
    deliveryEstimate: '2024-07-22',
    deliveryActual: '2024-07-22',
    status: 'delivered',
    total: '$45.50',
    paymentMethod: 'Credit Card ****1234',
    items: [
      { name: 'Organic Tomatoes', quantity: 2, price: '$12.50', image: '🍅' },
      { name: 'Fresh Lettuce', quantity: 3, price: '$18.00', image: '🥬' },
      { name: 'Green Peppers', quantity: 1, price: '$15.00', image: '🫑' }
    ],
    deliveryAddress: {
      name: 'John Doe',
      address: '123 Main Street, Apt 4B',
      city: 'New York, NY 10001',
      phone: '+1 (555) 123-4567'
    },
    supplierInfo: {
      name: 'Fresh Farms',
      email: 'support@freshfarms.com',
      phone: '+1 (555) 987-6543',
      address: '456 Farm Road, Green Valley, CA 90210'
    },
    trackingSteps: [
      {
        status: 'Order Placed',
        date: '2024-07-20',
        time: '10:30 AM',
        description: 'Your order has been placed successfully',
        icon: Package,
        completed: true
      },
      {
        status: 'Order Confirmed',
        date: '2024-07-20',
        time: '11:15 AM',
        description: 'Order confirmed by Fresh Farms',
        icon: CheckCircle,
        completed: true
      },
      {
        status: 'Preparing for Shipment',
        date: '2024-07-21',
        time: '09:00 AM',
        description: 'Items are being prepared for shipment',
        icon: Package,
        completed: true
      },
      {
        status: 'Out for Delivery',
        date: '2024-07-22',
        time: '08:30 AM',
        description: 'Your order is out for delivery',
        icon: Truck,
        completed: true
      },
      {
        status: 'Delivered',
        date: '2024-07-22',
        time: '02:45 PM',
        description: 'Order delivered successfully to your address',
        icon: CheckCircle,
        completed: true
      }
    ]
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'out for delivery':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'preparing for shipment':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleGoBack = () => {
    // This would typically navigate back to the orders page
    alert('Navigating back to orders page...');
  };

  const handleContactSupplier = () => {
    alert(`Contacting ${selectedOrder.supplierInfo.name} at ${selectedOrder.supplierInfo.email}`);
  };

  const handleReportIssue = () => {
    alert('Opening issue reporting form...');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Tracking</h1>
            <p className="text-gray-600">Track your order {selectedOrder.id} from {selectedOrder.supplier}</p>
          </div>
          
          <div className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
            {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tracking Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Tracking Timeline</h2>
            
            <div className="relative">
              {selectedOrder.trackingSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isLast = index === selectedOrder.trackingSteps.length - 1;
                
                return (
                  <div key={index} className="relative flex items-start gap-4 mb-6">
                    {/* Timeline line */}
                    {!isLast && (
                      <div className={`absolute left-4 top-8 w-0.5 h-16 ${
                        step.completed ? 'bg-green-300' : 'bg-gray-200'
                      }`} />
                    )}
                    
                    {/* Icon */}
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-medium ${
                          step.completed ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.status}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {step.date} at {step.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Items</h2>
            
            <div className="space-y-4">
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{item.price}</p>
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">{selectedOrder.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID</span>
                <span className="font-medium text-blue-600">{selectedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date</span>
                <span className="font-medium">{new Date(selectedOrder.orderDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="font-medium">{new Date(selectedOrder.deliveryEstimate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium text-sm">{selectedOrder.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Delivery Address
            </h3>
            
            <div className="space-y-2 text-sm">
              <p className="font-medium text-gray-900">{selectedOrder.deliveryAddress.name}</p>
              <p className="text-gray-600">{selectedOrder.deliveryAddress.address}</p>
              <p className="text-gray-600">{selectedOrder.deliveryAddress.city}</p>
              <p className="text-gray-600 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {selectedOrder.deliveryAddress.phone}
              </p>
            </div>
          </div>

          {/* Supplier Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Information</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{selectedOrder.supplierInfo.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{selectedOrder.supplierInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{selectedOrder.supplierInfo.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                <span className="text-gray-600">{selectedOrder.supplierInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleContactSupplier}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Mail className="w-4 h-4" />
              Contact Supplier
            </button>
            
            <button
              onClick={handleReportIssue}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Report an Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;