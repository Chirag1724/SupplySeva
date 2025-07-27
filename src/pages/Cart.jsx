import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../pages/CartContext";

export default function Cart() {
  const { cartItems, updateQty, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const increaseQty = (id) => {
    const item = cartItems.find((item) => item.id === id);
    updateQty(id, item.quantity + 1);
  };

  const decreaseQty = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item.quantity > 1) updateQty(id, item.quantity - 1);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const delivery = subtotal >= 500 ? 0 : 40;
  const total = subtotal + delivery;
  const freeDeliveryThreshold = 500;
  const amountNeededForFree = freeDeliveryThreshold - subtotal;

  const handleCheckout = () => {
    navigate("/confirmation");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">{cartItems.length} items in your cart</p>
      </div>

{cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
        </div>
      ) : (
        <div className="flex gap-6">
          {/* Cart Items Table */}
          <div className="flex-1">
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-300">
                <div className="col-span-6 text-sm font-medium text-gray-700 uppercase">PRODUCT</div>
                <div className="col-span-2 text-sm font-medium text-gray-700 uppercase text-center">PRICE</div>
                <div className="col-span-2 text-sm font-medium text-gray-700 uppercase text-center">QUANTITY</div>
                <div className="col-span-2 text-sm font-medium text-gray-700 uppercase text-center">TOTAL</div>
              </div>

              {/* Cart Items */}
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 px-6 py-6 items-center border-b border-gray-200 last:border-b-0"
                >
                  {/* Product Info */}
                  <div className="col-span-6 flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-blue-100 rounded-lg hidden flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {item.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-base">{item.name}</h3>
                      <p className="text-sm text-gray-500">Per {item.unit || 'kg'}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center">
                    <span className="text-gray-900 font-medium">₹{item.price}</span>
                    <span className="text-gray-500 text-sm">/{item.unit || 'kg'}</span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors text-lg"
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="px-4 py-2 font-medium min-w-[50px] text-center border-x border-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="col-span-2 text-center flex items-center justify-center gap-2">
                    <span className="font-semibold text-gray-900">
                      ₹{item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                      title="Remove item"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM6 5a1 1 0 012 0v6a1 1 0 11-2 0V5zm6 0a1 1 0 10-2 0v6a1 1 0 102 0V5z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-80">
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className={`font-medium ${delivery === 0 ? "text-green-600" : ""}`}>
                    {delivery === 0 ? "Free" : `₹${delivery}`}
                  </span>
                </div>

                {delivery > 0 && amountNeededForFree > 0 && (
                  <div className="text-green-600 text-sm font-medium py-2">
                    Add ₹{amountNeededForFree} more for free delivery!
                  </div>
                )}
              </div>

              <div className="border-t border-gray-300 pt-4 mb-6">
                <div className="flex justify-between text-xl font-semibold text-gray-900">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>



              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/delivery")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 5H3m4 8v6a2 2 0 002 2h8a2 2 0 002-2v-6m-10 0h8" />
                  </svg>
                  Place Order
                </button>
                
                <button
                  onClick={() => navigate("/")}
                  className="w-full border border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-lg transition-colors font-medium"
                >
                  Continue Shopping
                </button>

                <button
                  onClick={clearCart}
                  className="w-full text-red-500 hover:text-red-700 py-2 text-sm font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}