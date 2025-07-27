import React, { useState } from "react";
// import axios from "axios";
import {
  MapPin,
  Clock,
  Edit3,
  Truck,
  CheckCircle,
  X,
} from "lucide-react";
import { useCart } from "../pages/CartContext";

export default function Deliver() {
  const [selectedSlot, setSelectedSlot] = useState("2-4 PM");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [anytimeDelivery, setAnytimeDelivery] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { cartItems, clearCart } = useCart();

  // Calculate subtotal, delivery fee, and total amount
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const delivery = cartItems.length === 0 ? 0 : (subtotal >= 500 ? 0 : 40);
  const totalAmount = subtotal + delivery;

  const handleConfirmOrder = async () => {
    const orderPayload = {
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: Number(item.price),
      })),
      deliveryTime: anytimeDelivery ? "Anytime" : selectedSlot,
      instructions: specialInstructions || "None",
      address: "The Spice Merchant, 123 Market Road, Colaba, Mumbai",
      totalAmount: Number(totalAmount),
    };

    try {
      // Mock API call for demo
      console.log("Order payload:", orderPayload);
      setOrderSuccess(true);
      setError(null);
      clearCart();
    } catch (err) {
      console.error("Order placement failed:", err);
      setError("Order placement failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Details</h1>
          <p className="text-gray-600">Review your order and delivery preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address Card */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 text-green-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Delivery Address</h2>
                </div>
                <div className="ml-7">
                  <p className="font-medium text-gray-900">The Spice Merchant</p>
                  <p className="text-gray-600 mt-1">123 Market Road, Colaba, Mumbai</p>
                </div>
              </div>
            </div>

            {/* Delivery Time Slot Card */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 text-green-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Select Delivery Slot</h2>
                </div>
                <div className="ml-7">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {["10-12 AM", "12-2 PM", "2-4 PM", "4-6 PM", "6-8 PM"].map((slot) => (
                      <button
                        key={slot}
                        className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          selectedSlot === slot && !anytimeDelivery
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-200 hover:border-green-300 text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          setSelectedSlot(slot);
                          setAnytimeDelivery(false);
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="anytime"
                      checked={anytimeDelivery}
                      onChange={() => setAnytimeDelivery(!anytimeDelivery)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="anytime" className="ml-2 text-gray-700 cursor-pointer">
                      Anytime Delivery (Flexible timing)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Instructions Card */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Edit3 className="w-5 h-5 text-green-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Special Instructions</h2>
                </div>
                <div className="ml-7">
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none text-gray-700"
                    rows="4"
                    placeholder="Any special delivery instructions? (e.g., Ring the doorbell twice, Leave at the door, etc.)"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-8">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                    {cartItems.length} items
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No items in cart</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item, index) => (
                        <div key={item.id || item._id || index} className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div className={`w-full h-full bg-blue-100 rounded-lg ${item.image ? 'hidden' : 'flex'} items-center justify-center text-blue-600 font-semibold text-lg`}>
                              {item.name.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              Qty: {item.quantity} × ₹{item.price}
                              {item.unit && <span> per {item.unit}</span>}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">
                              ₹{(Number(item.price) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 mb-4 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({cartItems.length} items)</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span className={delivery === 0 ? "text-green-600" : ""}>
                          {delivery === 0 ? "Free" : `₹${delivery}`}
                        </span>
                      </div>

                      {delivery > 0 && cartItems.length > 0 && (500 - subtotal) > 0 && (
                        <div className="text-green-600 text-xs font-medium">
                          Add ₹{(500 - subtotal).toFixed(2)} more for free delivery!
                        </div>
                      )}
                    </div>

                    {/* Total */}
                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-xl font-bold text-gray-900">₹{totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Confirm Order Button */}
                <button
                  onClick={handleConfirmOrder}
                  disabled={cartItems.length === 0}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                    cartItems.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Truck className="w-4 h-4 mr-2" />
                    Confirm Order
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {orderSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center animate-pulse z-50">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span className="font-medium">Order placed successfully!</span>
        </div>
      )}

      {error && (
        <div className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-lg shadow-lg flex items-center animate-pulse max-w-md z-50">
          <X className="w-5 h-5 mr-2 flex-shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}
    </div>
  );
}