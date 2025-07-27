// src/pages/Cart.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../pages/CartContext";

export default function Cart() {
  const { cartItems, updateQty, removeItem, clearCart } = useCart();
  const navigate = useNavigate(); // 👈

  const increaseQty = (id) => {
    const item = cartItems.find((item) => item._id === id || item.id === id);

    updateQty(id, item.quantity + 1);
  };

  const decreaseQty = (id) => {
   const item = cartItems.find((item) => item._id === id || item.id === id);

    if (item.quantity > 1) updateQty(id, item.quantity - 1);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const delivery = subtotal >= 500 ? 0 : 30;
  const total = subtotal + delivery;

  const handleCheckout = () => {
    // Optional: Add order logic here
    navigate("/confirmation");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id || item.id || `${item.name}-${item.price}`}

                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm">
                      ₹{item.price} × {item.quantity} = ₹
                      {item.price * item.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-3 py-1 border rounded"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-3 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="mt-4 bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Delivery Fee</span>
              <span className={delivery === 0 ? "text-green-600" : ""}>
                {delivery === 0 ? "Free" : `₹${delivery}`}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4 border-t pt-4">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition font-medium"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
