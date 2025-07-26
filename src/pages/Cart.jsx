import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingCart, Tag } from 'lucide-react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Fresh Tomatoes',
      image: 'https://images.unsplash.com/photo-1546470427-e2a04b81dfa8?w=150&h=150&fit=crop&crop=center',
      price: 120,
      unit: 'kg',
      quantity: 2,
      category: 'Vegetables'
    },
    {
      id: 2,
      name: 'Farm Fresh Eggs',
      image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=150&h=150&fit=crop&crop=center',
      price: 60,
      unit: 'dozen',
      quantity: 3,
      category: 'Dairy & Eggs'
    },
    {
      id: 3,
      name: 'Whole Wheat Bread',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&h=150&fit=crop&crop=center',
      price: 45,
      unit: 'loaf',
      quantity: 1,
      category: 'Bakery'
    },
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const increaseQty = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setAppliedPromo({ code: 'SAVE10', discount: 0.1, type: 'percentage' });
    } else if (promoCode.toLowerCase() === 'welcome50') {
      setAppliedPromo({ code: 'WELCOME50', discount: 50, type: 'fixed' });
    } else {
      alert('Invalid promo code');
      return;
    }
    setPromoCode('');
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert('Order placed successfully! Thank you for shopping with us.');
      setCartItems([]);
      setAppliedPromo(null);
      setIsCheckingOut(false);
    }, 2000);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  let discount = 0;
  if (appliedPromo) {
    discount = appliedPromo.type === 'percentage' 
      ? subtotal * appliedPromo.discount 
      : appliedPromo.discount;
  }
  
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const grandTotal = subtotal - discount + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto h-24 w-24 text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Table Header - Desktop Only */}
              <div className="hidden lg:block border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
              </div>
              
              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <div key={item.id} className="px-6 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="lg:col-span-6">
                        <div className="flex items-start space-x-4">
                          <div className="relative flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <span className="absolute -top-2 -right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                              {item.category}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500">Per {item.unit}</p>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="lg:col-span-2">
                        <div className="flex lg:justify-center">
                          <div className="lg:text-center">
                            <span className="text-lg font-semibold text-gray-900">₹{item.price}</span>
                            <span className="text-gray-500">/{item.unit}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="lg:col-span-2">
                        <div className="flex lg:justify-center">
                          <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                            <button
                              onClick={() => decreaseQty(item.id)}
                              className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 font-semibold min-w-[60px] text-center border-x border-gray-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQty(item.id)}
                              className="p-2 hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Total & Remove */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center justify-between lg:justify-center">
                          <div className="lg:text-center">
                            <span className="text-lg font-bold text-gray-900">₹{item.price * item.quantity}</span>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                
                {appliedPromo && (
                  <div className="flex justify-between text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    <span className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      {appliedPromo.code}
                      <button 
                        onClick={removePromo}
                        className="text-red-500 hover:text-red-700 ml-1 font-bold"
                      >
                        ×
                      </button>
                    </span>
                    <span className="font-semibold">-₹{Math.round(discount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">{deliveryFee === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}</span>
                </div>
                
                {subtotal <= 500 && (
                  <div className="bg-green-50 px-3 py-2 rounded-lg">
                    <p className="text-sm text-green-700 font-medium">
                      Add ₹{500 - subtotal} more for free delivery!
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{Math.round(grandTotal)}</span>
                </div>
              </div>

              {/* Promo Code */}
              {!appliedPromo && (
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Try: SAVE10 or WELCOME50
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
              >
                {isCheckingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Place Order
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <button className="text-green-600 hover:text-green-700 font-medium underline">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}