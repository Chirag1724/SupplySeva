import React, { useState } from "react";

export default function Deliver() {
  const [selectedSlot, setSelectedSlot] = useState("2-4 PM");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [anytimeDelivery, setAnytimeDelivery] = useState(false);

  const handleSlotChange = (slot) => {
    setSelectedSlot(slot);
    setAnytimeDelivery(false);
  };

  const handleAnytimeToggle = () => {
    setAnytimeDelivery(!anytimeDelivery);
    if (!anytimeDelivery) setSelectedSlot("Anytime");
  };

  const handleConfirmOrder = () => {
    alert(`Order Confirmed!\nSlot: ${selectedSlot}\nInstructions: ${specialInstructions}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10 font-sans">
      {/* Left Section */}
      <div className="w-full md:w-2/3 space-y-8">
        {/* Breadcrumb */}
        <div className="text-gray-500 text-sm">
          Cart / <span className="text-black">Delivery Info</span>
        </div>

        {/* Address */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Select Delivery Address</h2>
          <div className="border border-gray-300 rounded-lg p-4 flex justify-between items-start gap-4">
            <div>
              <p className="text-sm uppercase text-gray-500">Shop</p>
              <p className="font-semibold">The Spice Merchant</p>
              <p className="text-gray-600 text-sm">
                123 Market Rd, Mumbai, 400001 | +91-9876543210
              </p>
              <button className="mt-2 px-4 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300">
                Edit
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1586864387784-dbe01b5f3c94"
              alt="Shop"
              className="w-32 h-20 object-cover rounded"
            />
          </div>
          <button className="mt-3 px-4 py-2 bg-gray-100 rounded shadow-sm text-sm hover:bg-gray-200">
            Add New Address
          </button>
        </div>

        {/* Delivery Slot */}
        <div>
          <h3 className="text-xl font-bold mb-2">Choose Delivery Slot</h3>
          <div className="space-y-3">
            {["2-4 PM", "6-8 PM", "Tomorrow"].map((slot) => (
              <label
                key={slot}
                className="flex items-center gap-3 border rounded-lg px-4 py-2 cursor-pointer hover:border-green-500"
              >
                <input
                  type="radio"
                  checked={selectedSlot === slot}
                  onChange={() => handleSlotChange(slot)}
                  className="accent-green-600"
                />
                Today {slot === "Tomorrow" ? slot : slot}
              </label>
            ))}
            <label className="flex items-center gap-2 mt-1 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={anytimeDelivery}
                onChange={handleAnytimeToggle}
                className="accent-green-600"
              />
              Deliver anytime during business hours
            </label>
          </div>
        </div>

        {/* Special Instructions */}
        <div>
          <h3 className="text-xl font-bold mb-2">Special Delivery Instructions</h3>
          <textarea
            rows="4"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write any delivery note..."
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Right Section - Order Summary */}
      <div className="w-full md:w-1/3 space-y-4">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Order Summary</h3>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Items Ordered:</span> 10
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Total Amount:</span> ₹ 5,500
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Estimated Delivery:</span> Today 6–8 PM
          </p>
        </div>

        <button
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
          onClick={handleConfirmOrder}
        >
          Proceed to Confirm Order
        </button>
      </div>
    </div>
  );
}
