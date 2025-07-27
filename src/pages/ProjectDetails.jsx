import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  ShoppingCart,
  Star,
  LoaderCircle,
  Truck,
  Shield,
  Tag,
  Clock,
} from "lucide-react";
import { useCart } from "../pages/CartContext"; // ✅ add this

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // ✅ access addToCart from context

  const transformProduct = (p) => ({
    ...p,
    image: `http://localhost:5000${p.imageUrl}`,
    price: `₹${p.price}/kg`,
    originalPrice: `₹${Math.round(p.price * 1.2)}/kg`,
    discount: 100 - Math.round((p.price / (p.price * 1.2)) * 100),
    rating: +(Math.random() * 1.5 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 200 + 20),
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const transformed = transformProduct(res.data);
        setProduct(transformed);
      } catch (err) {
        console.error("Error fetching product:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin" size={40} />
      </div>
    );
  }

  if (!product) {
    return <div className="p-6 text-center text-red-500">Product not found.</div>;
  }

  // ✅ prepare cart-compatible product object
  const handleAddToCart = () => {
    console.log("Product being added to cart:", product);
    addToCart({
      id: product._id,
      name: product.name,
      image: product.image,
      price: parseFloat(product.price.replace(/[₹\/kg]/g, '')),
      unit: "kg",
      category: "Fruits",
      supplierId: product.supplierId,
    });






  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-xl mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl w-full h-[350px] object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">{product.name}</h1>

          <div className="flex items-center text-sm text-gray-600 mb-3">
            <Star className="text-yellow-500 mr-1" size={16} />
            {product.rating} ({product.reviews} reviews)
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <span className="text-2xl font-bold text-green-600">{product.price}</span>
            <span className="text-gray-500 line-through">{product.originalPrice}</span>
            <span className="text-sm text-red-500 font-medium">{product.discount}% off</span>
          </div>

          <p className="text-gray-700 mb-6">
            {product.description || "No description available for this product."}
          </p>

          {/* ✅ Updated Add to Cart Button */}
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

          {/* Value Props */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Feature
              icon={<Truck size={20} className="text-green-500" />}
              title="Fast Delivery"
              subtitle="Within 2 days"
            />
            <Feature
              icon={<Shield size={20} className="text-green-500" />}
              title="Safe Payment"
              subtitle="100% secure"
            />
            <Feature
              icon={<Tag size={20} className="text-green-500" />}
              title="Best Prices"
              subtitle="Affordable & fresh"
            />
            <Feature
              icon={<Clock size={20} className="text-green-500" />}
              title="24/7 Support"
              subtitle="Always available"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, subtitle }) {
  return (
    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
      <div className="mr-3">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-800">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
