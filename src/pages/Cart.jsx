import React, { useState } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Tomatoes',
      image: 'https://via.placeholder.com/60',
      price: 120,
      unit: 'kg',
      quantity: 2,
    },
    {
      id: 2,
      name: 'Eggs',
      image: 'https://via.placeholder.com/60',
      price: 60,
      unit: 'dozen',
      quantity: 3,
    },
    {
      id: 3,
      name: 'Bread',
      image: 'https://via.placeholder.com/60',
      price: 45,
      unit: 'loaf',
      quantity: 1,
    },
  ]);

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

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const grandTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Subtotal</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id} className="border-t">
                <td className="py-3 px-4 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md" />
                  <span>{item.name}</span>
                </td>
                <td className="py-3 px-4">₹{item.price}/{item.unit}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >-</button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >+</button>
                  </div>
                </td>
                <td className="py-3 px-4">₹{item.price * item.quantity}</td>
                <td className="py-3 px-4 text-red-500 cursor-pointer hover:underline" onClick={() => removeItem(item.id)}>
                  Remove
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-8 text-right">
        <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
        <p>Total Items: <span className="font-medium">{totalItems}</span></p>
        <p>Grand Total: <span className="font-medium">₹{grandTotal}</span></p>

        <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700">
          Place Order
        </button>
      </div>
    </div>
  );
}
