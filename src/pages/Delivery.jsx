import React, { useState } from "react";
import { MapPin, Clock, Edit3, Plus, Truck, Package, IndianRupee, CheckCircle, X } from "lucide-react";

export default function Deliver() {
  const [selectedSlot, setSelectedSlot] = useState("2-4 PM");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [anytimeDelivery, setAnytimeDelivery] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});

  const deliverySlots = [
    { id: "2-4", label: "2-4 PM", available: true },
    { id: "4-6", label: "4-6 PM", available: true },
    { id: "6-8", label: "6-8 PM", available: true },
    { id: "tomorrow", label: "Tomorrow 10-12 PM", available: true }
  ];

  const handleSlotChange = (slot) => {
    setSelectedSlot(slot);
    setAnytimeDelivery(false);
  };

  const handleAnytimeToggle = () => {
    setAnytimeDelivery(!anytimeDelivery);
    if (!anytimeDelivery) setSelectedSlot("Anytime");
  };

  const handleConfirmOrder = () => {
    const deliveryTime = anytimeDelivery ? "Anytime during business hours" : selectedSlot;
    const orderId = `SPM${Math.floor(Math.random() * 100000)}`;
    
    setOrderDetails({
      orderId,
      deliveryTime,
      instructions: specialInstructions || "None",
      address: "The Spice Merchant, 123 Market Road, Colaba, Mumbai"
    });
    
    setShowConfirmationPopup(true);
  };

  const closePopup = () => {
    setShowConfirmationPopup(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className={`max-w-7xl mx-auto p-4 md:p-8 transition-all duration-300 ${showConfirmationPopup ? 'blur-sm' : ''}`}>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>Cart</span>
            <span className="mx-2">›</span>
            <span className="text-green-600 font-medium">Delivery Info</span>
            <span className="mx-2">›</span>
            <span>Payment</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Delivery Information</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs uppercase bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        Delivery to
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">The Spice Merchant</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      123 Market Road, Colaba<br />
                      Mumbai, Maharashtra 400001
                    </p>
                    <p className="text-gray-500 text-sm">+91-9876543210</p>
                    <button className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                      <Edit3 className="w-3 h-3" />
                      Edit Address
                    </button>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=200&h=120&fit=crop"
                    alt="Delivery location map"
                    className="w-24 h-16 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              </div>
              
              <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" />
                Add New Address
              </button>
            </div>

            {/* Delivery Slot */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">Choose Delivery Slot</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {deliverySlots.map((slot) => (
                  <label
                    key={slot.id}
                    className={`relative flex items-center gap-3 border-2 rounded-lg px-4 py-3 cursor-pointer transition-all ${
                      selectedSlot === slot.label && !anytimeDelivery
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedSlot === slot.label && !anytimeDelivery}
                      onChange={() => handleSlotChange(slot.label)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedSlot === slot.label && !anytimeDelivery
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedSlot === slot.label && !anytimeDelivery && (
                        <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {slot.id === 'tomorrow' ? 'Tomorrow' : 'Today'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {slot.id === 'tomorrow' ? slot.label.replace('Tomorrow ', '') : slot.label}
                      </p>
                    </div>
                    {slot.available && (
                      <span className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full"></span>
                    )}
                  </label>
                ))}
              </div>
              
              <label className={`flex items-center gap-3 border-2 rounded-lg px-4 py-3 cursor-pointer transition-all ${
                anytimeDelivery 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'
              }`}>
                <input
                  type="checkbox"
                  checked={anytimeDelivery}
                  onChange={handleAnytimeToggle}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded border-2 ${
                  anytimeDelivery ? 'border-green-500 bg-green-500' : 'border-gray-300'
                }`}>
                  {anytimeDelivery && (
                    <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">Flexible Delivery</p>
                  <p className="text-sm text-gray-600">Deliver anytime during business hours (9 AM - 8 PM)</p>
                </div>
              </label>
            </div>

            {/* Special Instructions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Special Delivery Instructions</h2>
              <textarea
                rows="4"
                className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Add any special instructions for delivery (e.g., 'Ring the bell twice', 'Leave at the door', etc.)"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-2">
                {specialInstructions.length}/200 characters
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Items</span>
                  <span className="font-medium">10 items</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium flex items-center">
                    <IndianRupee className="w-4 h-4" />
                    5,200
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Delivery fee</span>
                  <span className="font-medium flex items-center">
                    <IndianRupee className="w-4 h-4" />
                    50
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">GST</span>
                  <span className="font-medium flex items-center">
                    <IndianRupee className="w-4 h-4" />
                    250
                  </span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-green-600 flex items-center">
                    <IndianRupee className="w-5 h-5" />
                    5,500
                  </span>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Estimated Delivery
                  </span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  {anytimeDelivery ? "Today, anytime" : `Today, ${selectedSlot}`}
                </p>
              </div>

              <button
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
                onClick={handleConfirmOrder}
              >
                Proceed to Payment
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                By placing this order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Popup */}
      {showConfirmationPopup && (
        <div className="fixed inset-0 backdrop-s bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="p-6">
              {/* Close Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={closePopup}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Order Confirmed!
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Thank you for your order. We'll start preparing it right away.
              </p>

              {/* Order Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Order ID:</span>
                  <span className="font-semibold text-gray-900">{orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Delivery Time:</span>
                  <span className="font-medium text-gray-900">{orderDetails.deliveryTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Amount:</span>
                  <span className="font-bold text-green-600 flex items-center">
                    <IndianRupee className="w-4 h-4" />
                    5,500
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Delivery Address:</span>
                  <p className="text-sm font-medium text-gray-900 mt-1">{orderDetails.address}</p>
                </div>
                {orderDetails.instructions !== "None" && (
                  <div>
                    <span className="text-sm text-gray-600">Special Instructions:</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">{orderDetails.instructions}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                  Track Your Order
                </button>
                <button 
                  onClick={closePopup}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Footer Note */}
              <p className="text-xs text-gray-500 text-center mt-4">
                You'll receive updates via SMS and email
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}