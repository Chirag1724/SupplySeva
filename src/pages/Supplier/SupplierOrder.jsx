// Deliver.jsx
import React, { useState } from "react";
import axios from "axios";
import {
  MapPin,
  Clock,
  Edit3,
  Truck,
  Package,
  IndianRupee,
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

  const totalAmount = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const handleConfirmOrder = async () => {
    const orderPayload = {
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: Number(item.price),
        supplierId: item.supplierId, // Must exist in item
      })),
      deliveryTime: anytimeDelivery ? "Anytime" : selectedSlot,
      instructions: specialInstructions || "None",
      address: "The Spice Merchant, 123 Market Road, Colaba, Mumbai",
      totalAmount: Number(totalAmount),
    };

    try {
      await axios.post("http://localhost:5000/api/orders", orderPayload);
      setOrderSuccess(true);
      setError(null);
      clearCart();
    } catch (err) {
      console.error("Order placement failed:", err.response?.data || err.message);
      setError("Order placement failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>

      <div className="border p-4 rounded-lg shadow-sm mb-4">
        <div className="flex items-center mb-2">
          <MapPin className="mr-2 text-gray-600" />
          <span className="font-medium">Delivering to:</span>
        </div>
        <p className="ml-6">The Spice Merchant, 123 Market Road, Colaba, Mumbai</p>
      </div>

      <div className="border p-4 rounded-lg shadow-sm mb-4">
        <div className="flex items-center mb-2">
          <Clock className="mr-2 text-gray-600" />
          <span className="font-medium">Select Delivery Slot</span>
        </div>
        <div className="ml-6 space-y-2">
          {["10-12 AM", "12-2 PM", "2-4 PM", "4-6 PM", "6-8 PM"].map((slot) => (
            <div
              key={slot}
              className={`cursor-pointer px-3 py-2 rounded border ${
                selectedSlot === slot ? "border-green-500 bg-green-50" : "border-gray-300"
              }`}
              onClick={() => {
                setSelectedSlot(slot);
                setAnytimeDelivery(false);
              }}
            >
              {slot}
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={anytimeDelivery}
              onChange={() => setAnytimeDelivery(!anytimeDelivery)}
            />
            <label>Anytime Delivery</label>
          </div>
        </div>
      </div>

      <div className="border p-4 rounded-lg shadow-sm mb-4">
        <div className="flex items-center mb-2">
          <Edit3 className="mr-2 text-gray-600" />
          <span className="font-medium">Add Special Instructions</span>
        </div>
        <textarea
          className="ml-6 w-full p-2 border border-gray-300 rounded"
          rows="3"
          placeholder="e.g. Ring the doorbell twice..."
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
        ></textarea>
      </div>

      <div className="border p-4 rounded-lg shadow-sm mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Package className="mr-2 text-gray-600" />
            <span className="font-medium">Order Summary</span>
          </div>
          <span className="font-medium">{cartItems.length} items</span>
        </div>
        <ul className="ml-6 list-disc">
          {cartItems.map((item, index) => (
            <li key={item._id || index}>
              {item.name} - {item.quantity} x ₹{item.price}
            </li>
          ))}
        </ul>
      </div>

      <div className="border p-4 rounded-lg shadow-sm mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <IndianRupee className="mr-2 text-gray-600" />
            <span className="font-medium">Total Amount</span>
          </div>
          <span className="font-bold text-green-600">₹{totalAmount}</span>
        </div>
      </div>

      <button
        onClick={handleConfirmOrder}
        disabled={cartItems.length === 0}
        className={`w-full py-3 rounded text-white transition ${
          cartItems.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        Confirm Order
      </button>

      {orderSuccess && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded flex items-center">
          <CheckCircle className="mr-2" /> Order placed successfully!
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded flex items-center">
          <X className="mr-2" /> {error}
        </div>
      )}
    </div>
  );
}
