import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(prev => prev.filter(p => p._id !== id));
      } catch (err) {
        console.error("Error deleting product:", err.message);
      }
    }
  };

  const total = products.length;
  const inStock = products.filter(p => p.stock > 0).length;
  const lowStock = products.filter(p => p.stock <= 10).length;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-semibold">📦 All Products</h2>
          <p className="text-gray-500 mt-1">Manage your products efficiently</p>
        </div>
        <button
          onClick={() => navigate("/add-product")}
          className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition font-semibold"
        >
          + Add New Product
        </button>
      </div>

      {/* Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="bg-gray-100 p-4 rounded-xl shadow text-center font-semibold text-gray-700">🧾 Total: {total}</div>
        <div className="bg-gray-100 p-4 rounded-xl shadow text-center font-semibold text-gray-700">✅ In Stock: {inStock}</div>
        <div className="bg-gray-100 p-4 rounded-xl shadow text-center font-semibold text-gray-700">⚠️ Low Stock: {lowStock}</div>
        <div className="bg-gray-100 p-4 rounded-xl shadow text-center font-semibold text-gray-700">📈 Total Orders: 2270</div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-10">
        <table className="min-w-full text-sm text-center border border-gray-200">
          <thead className="bg-gray-50 text-gray-700 font-semibold">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Orders</th>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-t">
                <td className="px-6 py-4 flex items-center gap-3 text-left">
                  <img
                    src={`http://localhost:5000${product.imageUrl}`}
                    alt={product.name}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </div>
                </td>
                <td className="px-6 py-4">₹{product.price}</td>
                <td className="px-6 py-4">{product.stock} kg</td>
                <td className="px-6 py-4">{product.orders ?? 0}</td>
                <td className="px-6 py-4">⭐ {product.rating ?? "N/A"}</td>
                <td className="px-6 py-4">
                 
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="py-6 text-gray-500">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
